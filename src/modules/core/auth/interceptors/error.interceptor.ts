import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {ToastService} from "../../../shared/services/toast.service";
import {ToastEventsType} from "../../../shared/models/toast-events.model";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastService: ToastService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          let errorMsg = '';
          if (err.error instanceof ErrorEvent) {
            console.log('this is client side error');
            errorMsg = `Error: ${err.error.message}`;

            this.toastService._toastEvents.next(
              [...this.toastService._toastEvents.getValue(),
                {
                  title: 'Client side error',
                  message: `Error: ${err.error.message}`,
                  type: ToastEventsType.FAILED
              }]
            );
          } else {
            console.log('this is server side error');
            errorMsg = `Error Code: ${err.status},  Message: ${err.message}`;

            this.toastService._toastEvents.next(
              [...this.toastService._toastEvents.getValue(),
                {
                  title: 'Server side error',
                  message: `Error Code: ${err.status},  Message: ${err.message}`,
                  type: ToastEventsType.FAILED
              }]
            );
          }
          console.log(errorMsg)
          return throwError(errorMsg)
        })
      );
  }
}
