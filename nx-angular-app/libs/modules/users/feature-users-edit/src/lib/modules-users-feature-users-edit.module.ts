import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedAngularMaterialComponentsModule } from '@smec-monorepo/shared/angular-material-components';
import { SharedUiModule } from '@smec-monorepo/shared/ui';

import { NgxPermissionsModule } from 'ngx-permissions';

import { UserService } from '@smec-monorepo/modules-users-data-access';
import { UserSettingsPage } from './pages';
import {
  ManageRolesComponent,
  ResetPasswordComponent,
  UserinfoComponent,
} from './components';

const routes: Routes = [
  {
    path: '',
    component: UserSettingsPage,
  },
];

const PAGES = [UserSettingsPage];

const COMPONENTS = [
  ManageRolesComponent,
  ResetPasswordComponent,
  UserinfoComponent,
];

@NgModule({
  declarations: [...PAGES, ...COMPONENTS],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedAngularMaterialComponentsModule,
    SharedUiModule,
    NgxPermissionsModule.forChild(),
  ],
  providers: [UserService],
})
export class ModulesUsersFeatureUsersEditModule {}
