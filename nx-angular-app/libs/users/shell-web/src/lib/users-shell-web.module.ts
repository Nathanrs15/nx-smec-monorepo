import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
// import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@smec-monorepo/users/feature-users').then(
        (m) => m.UsersFeatureUsersModule
      ),
    data: {
      permissions: { only: 'Users.View', redirectTo: '' },
      title: 'Usuarios',
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: 'user-settings/:id',
    loadChildren: () =>
      import('@smec-monorepo/users/feature-users-edit').then(
        (m) => m.UsersFeatureUsersEditModule
      ),
    data: {
      permissions: { only: 'Users.Edit', redirectTo: '' },
      title: 'Editar usuarios',
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: 'add-user',
    loadChildren: () =>
      import('@smec-monorepo/users/feature-users-add').then(
        (m) => m.UsersFeatureUsersAddModule
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
