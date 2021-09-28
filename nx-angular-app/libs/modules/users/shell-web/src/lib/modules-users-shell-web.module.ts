import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
// import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@smec-monorepo/modules-users-feature-users').then(
        (m) => m.ModulesUsersFeatureUsersModule
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
      import('@smec-monorepo/modules-users-feature-users-edit').then(
        (m) => m.ModulesUsersFeatureUsersEditModule
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
      import('@smec-monorepo/modules-users-feature-users-add').then(
        (m) => m.ModulesUsersFeatureUsersAddModule
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
export class ModulesUsersShellWebModule {}
