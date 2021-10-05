import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from '@smec-monorepo/layout';

import {
  AuthenticationGuard,
  UserIsLoggedGuard,
} from '@smec-monorepo/shared/guards';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [UserIsLoggedGuard],
    loadChildren: () =>
      import('@smec-monorepo/shared/login').then((m) => m.SharedLoginModule),
  },
  {
    path: 'app',
    component: LayoutComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'profile',
        loadChildren: () =>
          import('@smec-monorepo/modules-profile-shell-web').then(
            (m) => m.ModulesProfileShellWebModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('@smec-monorepo/modules-users-shell-web').then(
            (m) => m.ModulesUsersShellWebModule
          ),
      },
      {
        path: 'roles',
        loadChildren: () =>
          import('@smec-monorepo/modules-roles-shell-web').then(
            (m) => m.ModulesRolesShellWebModule
          ),
      },
      {
        path: 'api-resources',
        loadChildren: () =>
          import('@smec-monorepo/modules-claims-shell-web').then(
            (m) => m.ModulesClaimsShellWebModule
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'app', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
