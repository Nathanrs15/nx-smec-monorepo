import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@smec-monorepo/profile/feature-profile-edit').then(
        (m) => m.ProfileFeatureProfileEditModule
      ),
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ProfileShellWebModule {}
