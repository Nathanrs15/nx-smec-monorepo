import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@smec-monorepo/users/feature-users-list').then(
        (m) => m.UsersFeatureUsersListModule
      ),
  },
  {
    path: ':id',
    loadChildren: () =>
      import('@smec-monorepo/users/feature-user-detail').then(
        (m) => m.UsersFeatureUserDetailModule
      ),
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UsersShellWebModule {}
