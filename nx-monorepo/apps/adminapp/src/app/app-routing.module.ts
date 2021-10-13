import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
    AuthenticationGuard,
    UserIsLoggedGuard,
} from '@smec-monorepo/core-app';

import { LayoutComponent } from '@smec-monorepo/layout';
import { InitialDataResolver } from './app.resolvers';

const routes: Routes = [
    // {
    //     path: '',
    //     component: LayoutComponent,
    //     data: {
    //         layout: 'empty',
    //     },
    //     children: [
    //         {
    //             path: 'sign-in',
    //             canActivate: [UserIsLoggedGuard],
    //             loadChildren: () =>
    //                 import('@smec-monorepo/modules/auth').then(
    //                     (m) => m.AuthSignInModule
    //                 ),
    //         },
    //         {
    //             path: 'sign-out',
    //             loadChildren: () =>
    //                 import('@smec-monorepo/modules/auth').then(
    //                     (m) => m.AuthSignOutModule
    //                 ),
    //         },
    //     ],
    // },
    {
        path: 'test',
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
    },
    /*{
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
                    import('@smec-monorepo/modules/users').then(
                        (m) => m.UsersShellWebModule
                    ),
            },
            {
                path: 'roles',
                loadChildren: () =>
                    import('@smec-monorepo/modules/roles').then(
                        (m) => m.RolesShellWebModule
                    ),
            },
            {
                path: 'history-graph',
                loadChildren: () =>
                    import('@smec-monorepo/modules/cems/history-graph').then(
                        (m) => m.HistoryGraphShellWebModule
                    ),
            },
        ],
    },*/
    { path: '**', redirectTo: 'test', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
