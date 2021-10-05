import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPermissionsModule } from 'ngx-permissions';

import { RoleAddEditPage } from './pages';
import { RolesFeatureService } from '../data-access';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RoleFormComponent } from './components/role-form/role-form.component';

const MATERIAL = [
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  FlexLayoutModule,
];

const routes: Routes = [
  // { path: ':id', pathMatch: 'full', component: RoleAddEditPage },
  { path: '', pathMatch: 'full', component: RoleAddEditPage },
];

const PAGES = [RoleAddEditPage];
const COMPONENTS = [RoleFormComponent];

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
  providers: [RolesFeatureService],
})
export class FeatureRolesAddEditModule {}
