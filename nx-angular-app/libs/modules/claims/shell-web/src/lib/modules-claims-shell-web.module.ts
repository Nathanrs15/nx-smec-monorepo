import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { NgxPermissionsModule } from 'ngx-permissions';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@smec-monorepo/modules-claims-feature-claims').then(
        (m) => m.ModulesClaimsFeatureClaimsModule
      ),
    data: {
      permissions: { only: 'Resources.View', redirectTo: '/' },
      title: 'Recursos',
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: 'edit-resource/:id',
    loadChildren: () =>
      import('@smec-monorepo/modules-claims-feature-claims-edit').then(
        (m) => m.ModulesClaimsFeatureClaimsEditModule
      ),
    data: {
      permissions: { only: 'Resources.Edit', redirectTo: '' },
      title: 'Añadir nuevo recurso',
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: 'add-resource',
    loadChildren: () =>
      import('@smec-monorepo/modules-claims-feature-claims-edit').then(
        (m) => m.ModulesClaimsFeatureClaimsEditModule
      ),
    data: {
      permissions: { only: 'Resources.Create', redirectTo: '' },
      title: 'Editar recurso',
    },
    canActivate: [NgxPermissionsGuard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    // NgxPermissionsModule.forChild(),
    RouterModule.forChild(routes),
  ],
})
export class ModulesClaimsShellWebModule {}
