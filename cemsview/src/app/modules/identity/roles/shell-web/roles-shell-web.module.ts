/* eslint-disable arrow-parens */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NgxPermissionsGuard } from 'ngx-permissions';
// import { HasUnsavedDataGuard } from '@smec-monorepo/shared/confirm-dialog';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../feature-roles/feature-roles.module').then(
        (m) => m.FeatureRolesModule
      ),
    data: {
      permissions: { only: 'Roles.Edit', redirectTo: '' },
      title: 'Roles',
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: 'edit-role/:id',
    loadChildren: () =>
      import('../feature-roles-add-edit/feature-roles-add-edit.module').then(
        (m) => m.FeatureRolesAddEditModule
      ),
    data: {
      permissions: { only: 'Roles.Edit', redirectTo: '' },
      title: 'Editar rol',
    },
    canActivate: [NgxPermissionsGuard],
    // canDeactivate: [HasUnsavedDataGuard],
  },
  {
    path: 'add-role',
    loadChildren: () =>
      import('../feature-roles-add-edit/feature-roles-add-edit.module').then(
        (m) => m.FeatureRolesAddEditModule
      ),
    data: {
      permissions: { only: 'Roles.Create', redirectTo: '' },
      title: 'Añadir rol',
    },
    canActivate: [NgxPermissionsGuard],
    // canDeactivate: [HasUnsavedDataGuard],
  },
  {
    path: 'manage-permissions/:id',
    loadChildren: () =>
      import(
        '../feature-role-permissions/feature-roles-permissions.module'
      ).then((m) => m.FeatureRolesPermissionsModule),
    data: {
      permissions: { only: 'Permissions.Edit', redirectTo: '' },
      breadcrumb: 'Manage Permissions',
    },
    canActivate: [NgxPermissionsGuard],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class RolesShellWebModule {}
