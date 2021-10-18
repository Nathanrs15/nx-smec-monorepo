import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

import { map, tap } from 'rxjs/operators';
import { throwError as observableThrowError, Observable, of } from 'rxjs';

import jwt_decode from 'jwt-decode';
import { NgxPermissionsService } from 'ngx-permissions';
import { JWTDecoded, TokenResponse } from './tokenResponse';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    authKey = 'auth';
    clientId = 'interactive';
    baseUrl = environment.authUrl;

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: any,
        private router: Router,
        private permissionsService: NgxPermissionsService
    ) {}

    login(email: string, password: string): Observable<any> {
        const headers = new HttpHeaders({
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json',
        });
        const url = this.baseUrl + '/authentication/login';
        const data = {
            email,
            password,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            client_id: this.clientId,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            grant_type: 'password',
            scope: 'offline_acces profile email wheaterapi.read',
        };
        return this.http.post<TokenResponse>(url, data, { headers }).pipe(
            map((res: TokenResponse) => {
                const token = res && res.token;
                if (token) {
                    this.setAuth(res);
                    localStorage.setItem('currentUser', email);
                    return true;
                }
                return observableThrowError('Unauthorized');
            })
        );
    }

    logout(): boolean {
        this.setAuth(null);
        this.permissionsService.flushPermissions();
        localStorage.removeItem('currentUser');

        return true;
    }

    setAuth(auth: TokenResponse | null): boolean {
        if (isPlatformBrowser(this.platformId)) {
            if (auth) {
                localStorage.setItem(this.authKey, JSON.stringify(auth));
            } else {
                localStorage.removeItem(this.authKey);
            }
        }
        return true;
    }

    getAuth(): TokenResponse | null {
        if (isPlatformBrowser(this.platformId)) {
            const i = localStorage.getItem(this.authKey);
            if (i) {
                return JSON.parse(i);
            }
        }
        return null;
    }

    isLoggedIn(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(this.authKey) != null;
        }
        return false;
    }

    getDecodedToken(): JWTDecoded | null {
        const token = localStorage.getItem(this.authKey);
        if (token) {
            return jwt_decode(token) as JWTDecoded;
        }
        return null;
    }
}
