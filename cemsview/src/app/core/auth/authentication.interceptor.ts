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
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) {}
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = this.authService.isLoggedIn()
            ? this.authService.getAuth()?.token
            : null;

        if (token) {
            request = request.clone({
                headers: request.headers.set(
                    'Authorization',
                    'Bearer ' + token
                ),
            });
        }
        // Response
        return next.handle(request).pipe(
            catchError((error) => {
                // Catch "401 Unauthorized" responses
                if (
                    error instanceof HttpErrorResponse &&
                    error.status === 401
                ) {
                    // Sign out
                    this.authService.logout();

                    // Reload the app
                    location.reload();
                }

                return throwError(error);
            })
        );
    }
}
