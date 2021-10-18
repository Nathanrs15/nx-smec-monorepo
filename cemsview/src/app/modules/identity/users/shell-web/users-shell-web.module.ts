/* eslint-disable arrow-parens */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('../feature-users/feature-users.module').then(
                (m) => m.FeatureUsersModule
            ),
        data: {
            permissions: { only: 'Users.Edit', redirectTo: '' },
            title: 'Usuarios',
        },
        canActivate: [NgxPermissionsGuard],
    },
    {
        path: 'user-settings/:id',
        loadChildren: () =>
            import(
                '../feature-users-details/feature-users-details.module'
            ).then((m) => m.FeatureUsersDetailsModule),
        data: {
            permissions: { only: 'Users.Edit', redirectTo: '' },
            title: 'Editar usuarios',
        },
        canActivate: [NgxPermissionsGuard],
    },
    {
        path: 'add-user',
        loadChildren: () =>
            import('../feature-users-add/feature-users-add.module').then(
                (m) => m.FeatureUsersAddModule
            ),
        data: {
            permissions: { only: 'Users.Create', redirectTo: '' },
            title: 'añadir usuarios',
        },
        canActivate: [NgxPermissionsGuard],
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UsersShellWebModule {}
