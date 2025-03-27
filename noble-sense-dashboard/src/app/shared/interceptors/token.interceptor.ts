import { Injectable } from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError, BehaviorSubject, filter, take } from 'rxjs';
import { AuthenticationService } from 'src/app/pages/authentication/services/authentication.service';
import { Router } from '@angular/router';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

constructor(private authService: AuthenticationService,private router:Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }


    return next.handle(request).pipe(
      catchError(error => {

        if (error instanceof HttpErrorResponse && error.status === 401 || error.status===403) {
          return this.handle401Error(request, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string | null): HttpRequest<any> {
    return token ? request.clone({ setHeaders: { 'Authorization': `Bearer ${token}` } }) : request;
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
        this.isRefreshing = true;
        this.refreshTokenSubject.next(null);

        return this.authService.refreshToken().pipe(
            switchMap((token: any) => {
                this.isRefreshing = false;
                if (token && token.access_token) {
                    this.refreshTokenSubject.next(token.access_token);
                    return next.handle(this.addToken(request, token.access_token));
                } else {
                    // Handle null or invalid token response
                    this.authService.logout();
                    return throwError(() => new Error('Token refresh failed, user not authenticated'));
                }
            }),
            catchError(error => {
                this.isRefreshing = false;
                this.authService.logout();
                this.router.navigate(['/authentication/login']);
                return throwError(() => error);
            })
        );
    } else {
      return this.refreshTokenSubject.pipe(
        switchMap(token => {
          if (token) {
            return next.handle(this.addToken(request, token));
          }
          // Trigger a logout here since we are unable to refresh the token
          return throwError(() => new Error('Unable to refresh token'));
        })
      );
    }
  }
}
