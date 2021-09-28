import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NgxPermissionsGuard } from 'ngx-permissions';
// import { HasUnsavedDataGuard } from '@smec-monorepo/shared/confirm-dialog';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@smec-monorepo/modules-roles-feature-roles').then(
        (m) => m.ModulesRolesFeatureRolesModule
      ),
    data: {
      permissions: { only: 'Roles.View', redirectTo: '' },
      title: 'Roles',
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: 'edit-role/:id',
    loadChildren: () =>
      import('@smec-monorepo/modules-roles-feature-roles-edit').then(
        (m) => m.ModulesRolesFeatureRolesEditModule
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
      import('@smec-monorepo/modules-roles-feature-roles-edit').then(
        (m) => m.ModulesRolesFeatureRolesEditModule
      ),
    data: {
      permissions: { only: 'Roles.Crete', redirectTo: '' },
      title: 'Añadir rol',
    },
    canActivate: [NgxPermissionsGuard],
    // canDeactivate: [HasUnsavedDataGuard],
  },
  {
    path: 'manage-permissions/:id',
    loadChildren: () =>
      import('@smec-monorepo/modules/roles/feature-permissions').then(
        (m) => m.ModulesRolesFeaturePermissionsModule
      ),
    data: {
      permissions: { only: 'Permissions.View', redirectTo: '' },
      breadcrumb: 'Manage Permissions',
    },
    canActivate: [NgxPermissionsGuard],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ModulesRolesShellWebModule {}
