import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPermissionsModule } from 'ngx-permissions';

import { UserSettingsPage } from './pages';
import {
  ManageRolesComponent,
  ResetPasswordComponent,
  UserinfoComponent,
} from './components';

import { UserService } from '../data-access';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';

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

const MATERIAL = [
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  FlexLayoutModule,
  MatSelectModule,
  MatTableModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatSidenavModule,
];

@NgModule({
  declarations: [...PAGES, ...COMPONENTS],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forChild(),
    ...MATERIAL,
  ],
  providers: [UserService],
})
export class FeatureUsersDetailsModule {}
