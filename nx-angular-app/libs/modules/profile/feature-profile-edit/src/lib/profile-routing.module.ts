import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HasUnsavedDataGuard } from '@smec-monorepo/shared/confirm-dialog';
import {
  ChangePasswordComponent,
  ChangeThemeComponent,
  ChangeUserDataComponent,
} from './components';
import { ProfilePage } from './pages';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    children: [
      {
        path: 'profile',
        component: ChangeUserDataComponent,
        canDeactivate: [HasUnsavedDataGuard],
        data: { title: 'Perfil' },
      },
      {
        path: 'password',
        component: ChangePasswordComponent,
        canDeactivate: [HasUnsavedDataGuard],
        data: { title: 'Cambiar contraseña' },
      },
      {
        path: 'theme',
        component: ChangeThemeComponent,
        data: { title: 'Tema' },
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
// data: {
//   permissions: { only: 'Users.Edit', redirectTo: '' },
// },
// canActivate: [NgxPermissionsGuard],
// canDeactivate: [HasUnsavedDataGuard],
