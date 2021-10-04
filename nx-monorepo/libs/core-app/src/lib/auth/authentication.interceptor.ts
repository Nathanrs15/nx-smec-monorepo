import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const auth = this.injector.get(AuthenticationService);

    const token = auth.isLoggedIn() ? auth.getAuth()?.token : null;

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        return throwError(error.message);
      })
    );
  }
}
