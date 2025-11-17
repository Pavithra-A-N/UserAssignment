import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppMessageService } from './message.service'; 

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private appMessageService: AppMessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unexpected error occurred.';
        let summary = 'Operation Failed';
        
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Network Error: ${error.error.message}`;
        } else {
          const serverMessage = error.error?.message || error.statusText;
          errorMessage = `Server Error (${error.status}): ${serverMessage}`;
          
          if (error.status === 401) {
            summary = 'Unauthorized Access';
            errorMessage = 'Your session has expired or you lack permissions.';
          } else if (error.status >= 500) {
            summary = 'Server Unavailable';
            errorMessage = 'The server encountered an error. Please try again later.';
          }
        }

        // it can also be a dialog or error title in the form .
        //  For now I have consumed available Message Service since it's the mock data
        this.appMessageService.error(summary, errorMessage);

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}