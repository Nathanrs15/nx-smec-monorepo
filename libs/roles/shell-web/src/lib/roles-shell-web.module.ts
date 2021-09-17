import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NgxPermissionsGuard } from 'ngx-permissions';
import { HasUnsavedDataGuard } from '@smec-monorepo/shared/guards';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@smec-monorepo/roles/feature-roles').then(
        (m) => m.RolesFeatureRolesModule
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
      import('@smec-monorepo/roles/feature-roles-edit').then(
        (m) => m.RolesFeatureRolesEditModule
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
      import('@smec-monorepo/roles/feature-roles-add').then(
        (m) => m.RolesFeatureRolesAddModule
      ),
    data: {
      permissions: { only: 'Roles.Crete', redirectTo: '' },
      title: 'Añadir rol',
    },
    canActivate: [NgxPermissionsGuard],
    // canDeactivate: [HasUnsavedDataGuard],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class RolesShellWebModule {}
