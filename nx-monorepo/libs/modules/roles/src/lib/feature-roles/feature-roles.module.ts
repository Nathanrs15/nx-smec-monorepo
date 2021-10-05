import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPermissionsModule } from 'ngx-permissions';

import { RolesFeatureService } from '../data-access';

import { RolesPage } from './pages';
import { RolesListComponent } from './components';

import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const MATERIAL = [
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
];

const routes: Routes = [{ path: '', component: RolesPage }];

const PAGES = [RolesPage];
const COMPONENTS = [RolesListComponent];

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
export class FeatureRolesModule {}
