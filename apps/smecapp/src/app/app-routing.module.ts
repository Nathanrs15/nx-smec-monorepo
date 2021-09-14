import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultLayoutComponent } from '@smec-monorepo/shared/ui';

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
    component: DefaultLayoutComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('@smec-monorepo/users/shell-web').then(
            (m) => m.UsersShellWebModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('@smec-monorepo/profile/shell-web').then(
            (m) => m.ProfileShellWebModule
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
