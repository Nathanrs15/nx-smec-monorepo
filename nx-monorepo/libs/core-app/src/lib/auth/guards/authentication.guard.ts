import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
    constructor(
        private router: Router,
        private permissionsService: NgxPermissionsService,
        private authService: AuthenticationService
    ) {}

    canActivate() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['sign-in']);
            return false;
        }

        const token = this.authService.getDecodedToken();

        this.permissionsService.flushPermissions();
        if (token && Array.isArray(token.permissions)) {
            this.permissionsService.loadPermissions(token.permissions);
        } else {
            this.permissionsService.loadPermissions([...token?.permissions]);
        }
        return true;
    }
}

@Injectable({
    providedIn: 'root',
})
export class UserIsLoggedGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthenticationService
    ) {}

    canActivate(/*route: ActivatedRouteSnapshot, state: RouterStateSnapshot*/) {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['app']);
        }
        return true;
    }
}
