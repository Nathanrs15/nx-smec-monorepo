import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  ManagePermissionsComponent,
  ResourceSelectionComponent,
} from './components';
import { PermissionsPage, RolePermissionsPage } from './pages';
import { RolesFeatureService } from '../data-access';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const MATERIAL = [
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatTableModule,
  MatCheckboxModule,
  MatMenuModule,
  MatSlideToggleModule,
];

const routes: Routes = [
  {
    path: '',
    component: RolePermissionsPage,
    children: [
      {
        path: '',
        redirectTo: 'Users',
        pathMatch: 'full',
      },
      {
        path: ':type',
        component: PermissionsPage,
      },
    ],
  },
];

const COMPONENTS = [ManagePermissionsComponent, ResourceSelectionComponent];
const PAGES = [PermissionsPage, RolePermissionsPage];

@NgModule({
  declarations: [...PAGES, ...COMPONENTS],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL,
  ],
  providers: [RolesFeatureService],
})
export class FeatureRolesPermissionsModule {}
