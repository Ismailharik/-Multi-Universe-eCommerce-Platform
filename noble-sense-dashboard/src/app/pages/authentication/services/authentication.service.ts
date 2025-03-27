import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError, catchError, tap } from 'rxjs';
import { RegisterRequest } from '../models/registerRequest.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ChangePasswordRequest } from '../models/changePassword.model';
import { RegisterResponse } from '../models/registerResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly USER_KEY = 'USER_KEY'

  private apiUrl = environment.host + "/api/v1/auth";


  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  login(user: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/authenticate`, user)
      .pipe(
        tap(resp => {
          this.saveLoggedUser(resp.fullName);
          this.storeTokens(resp);
        })
      );
  }

  refreshToken(): Observable<RegisterResponse> {
    const headers = new HttpHeaders()
    .set(this.REFRESH_TOKEN,this.getRefreshToken()!)

    console.log(headers)  
    return this.http
      .post<RegisterResponse>(`${this.apiUrl}/refresh-token`, {},{ headers })
      .pipe(
        tap((resp) => {
          // Handle the response, typically storing the new access token
          this.storeTokens(resp);
        }),
        catchError((error) => {
          // Handle any errors, such as token refresh failure
          this.logout();
          return throwError(
            () =>
              new Error(
                'Token refresh failed, user not authenticated: ' + error.message
              )
          );
        })
      );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        this.removeTokens()
        this.router.navigate(['/login/authentication']);
      }),
      catchError(error => {
        console.error('Logout HTTP error:', error);
        return throwError(() => error);
      })
    );
  }

  isLoggedIn(): boolean {
    const token = this.getJwtToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  getJwtToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeTokens(token: RegisterResponse): void {
    localStorage.setItem(this.JWT_TOKEN, token.access_token);
    if (token.refresh_token) {
      localStorage.setItem(this.REFRESH_TOKEN, token.refresh_token);
    }
  }

  private removeTokens(): void {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem(this.USER_KEY)
  }



  changePassword(changePassword: ChangePasswordRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/change-password`, changePassword);
  }

  changeUserPassword(phone: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/change-user-password`, { phone, password });
  }

  handleAuthenticationError(err: any): void {
    if (err instanceof HttpErrorResponse && (err.status === 401 || err.status === 403)) {
      this.removeTokens();
      this.router.navigate(['/authentication/login']);
    }
  }

  getUserRole(): string | null {
    const token = this.getJwtToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.role || null;
    }
    return null;
  }

  private saveLoggedUser(loggedUser: string) {
    localStorage.setItem(this.USER_KEY, loggedUser);
  }
  getLoggedUser(): string {
    const loggedUser = localStorage.getItem(this.USER_KEY);
    return loggedUser ? loggedUser : "User not available";
  }


}
