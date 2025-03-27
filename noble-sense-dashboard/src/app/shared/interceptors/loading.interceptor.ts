import { DestroyRef, Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
var pendingRequests = 0
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  destroyRef= inject(DestroyRef)

  constructor(private loadingService: LoadingService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.shoLoding();
    pendingRequests++

    return next.handle(request)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .pipe(
      tap({
        next: event => {
          if (event.type == HttpEventType.Response) {
            this.handleHideLoading()
          }
        },
        error: () => {
          this.handleHideLoading()
        }
      })
    )
  }
  handleHideLoading() {
    pendingRequests--
    if (pendingRequests == 0) {
      this.loadingService.hideLoding()
    }
  }
}
