import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
    CanActivateChild,
    CanLoad,
    UrlSegment,
    UrlTree,
} from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { Route } from '@angular/compiler/src/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationGuard
    implements CanActivate, CanActivateChild, CanLoad
{
    constructor(
        private _router: Router,
        private permissionsService: NgxPermissionsService,
        private _authService: AuthenticationService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        return this._check(redirectUrl);
    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        return this._check(redirectUrl);
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this._check('/');
    }

    private _check(redirectURL: string): Observable<boolean> {
        return of(this._authService.isLoggedIn()).pipe(
            switchMap((authenticated) => {
                if (!authenticated) {
                    // Redirect to the sign-in page
                    this._router.navigate(['sign-in'], {
                        queryParams: { redirectURL },
                    });

                    // prevent access
                    return of(false);
                }

                const token = this._authService.getDecodedToken();

                this.permissionsService.flushPermissions();
                if (token && Array.isArray(token.permissions)) {
                    this.permissionsService.loadPermissions(token.permissions);
                } else {
                    this.permissionsService.loadPermissions([
                        ...token?.permissions,
                    ]);
                }

                // allow access
                return of(true);
            })
        );
    }
}
