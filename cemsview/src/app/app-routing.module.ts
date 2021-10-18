/* eslint-disable arrow-parens */
import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes,
    ExtraOptions,
    PreloadAllModules,
} from '@angular/router';
import { InitialDataResolver } from './app.resolvers';
import { AuthenticationGuard as AuthGuard } from './core/auth/guards/authentication.guard';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';
import { LayoutComponent } from './layout/layout.component';

const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
};

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'history-graph' },
    {
        path: 'signed-in-redirect',
        pathMatch: 'full',
        redirectTo: 'history-graph',
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth').then((m) => m.AuthSignInModule),
            },
        ],
    },
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () =>
                    import('app/modules/auth').then((m) => m.AuthSignOutModule),
            },
            // {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
        ],
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'users',
                loadChildren: () =>
                    import('app/modules/identity/users').then(
                        (m) => m.UsersShellWebModule
                    ),
            },
            {
                path: 'roles',
                loadChildren: () =>
                    import('app/modules/identity/roles').then(
                        (m) => m.RolesShellWebModule
                    ),
            },
            {
                path: 'resources',
                loadChildren: () =>
                    import('app/modules/identity/claims').then(
                        (m) => m.ClaimsShellWebModule
                    ),
            },
            {
                path: 'history-graph',
                loadChildren: () =>
                    import('app/modules/cems/history-graph').then(
                        (m) => m.HistoryGraphShellWebModule
                    ),
            },
        ],
    },
    // { path: '**', redirectTo: 'users' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerConfig)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
