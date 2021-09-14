import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserSettingsPage } from './pages';
import {
  ManageRolesComponent,
  ResetPasswordComponent,
  UserinfoComponent,
} from './components';

import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { UserService } from '@smec-monorepo/users/data-access';
import { NgxPermissionsModule } from 'ngx-permissions';

const routes: Routes = [
  {
    path: ':id',
    pathMatch: 'full',
    component: UserSettingsPage,
    data: {
      title: 'Editar usuario',
    },
  },
];

const PAGES = [UserSettingsPage];
const COMPONENTS = [
  ManageRolesComponent,
  ResetPasswordComponent,
  UserinfoComponent,
];
const MATERIAL = [
  MatCardModule,
  FlexLayoutModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
];

@NgModule({
  declarations: [...PAGES, ...COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxPermissionsModule.forChild(),
    ...MATERIAL,
  ],
  providers: [UserService],
})
export class UsersFeatureUserDetailModule {}
