import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPermissionsModule } from 'ngx-permissions';

import { UserService } from '../data-access';
import { UserAddPage } from './pages';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

const PAGES = [UserAddPage];

const routes: Routes = [
  {
    path: '',
    component: UserAddPage,
  },
];

const MATERIAL = [
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  FlexLayoutModule,
  MatSelectModule,
];

@NgModule({
  declarations: [...PAGES],
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
export class FeatureUsersAddModule {}