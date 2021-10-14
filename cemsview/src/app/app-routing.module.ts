import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes,
    ExtraOptions,
    PreloadAllModules,
} from '@angular/router';
import { InitialDataResolver } from './app.resolvers';
import {
    AuthenticationGuard,
    UserIsLoggedGuard,
} from './core/auth/guards/authentication.guard';
import { LayoutComponent } from './layout/layout.component';

const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
};

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-in',
                canActivate: [UserIsLoggedGuard],
                loadChildren: () =>
                    import('app/modules/auth').then((m) => m.AuthSignInModule),
            },
            {
                path: 'sign-out',
                loadChildren: () =>
                    import('app/modules/auth').then((m) => m.AuthSignOutModule),
            },
        ],
    },
    {
        path: 'app',
        component: LayoutComponent,
        canActivate: [AuthenticationGuard],
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
    { path: '**', redirectTo: 'app', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerConfig)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
