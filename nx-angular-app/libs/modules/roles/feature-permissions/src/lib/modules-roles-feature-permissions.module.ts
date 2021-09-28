import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedAngularMaterialComponentsModule } from '@smec-monorepo/shared/angular-material-components';
import { RolesFeatureService } from '@smec-monorepo/modules-roles-data-acess';
import {
  ManagePermissionsComponent,
  ResourceSelectionComponent,
} from './components';
import { PermissionsPage, RolePermissionsPage } from './pages';

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
    SharedAngularMaterialComponentsModule,
  ],
  providers: [RolesFeatureService],
})
export class ModulesRolesFeaturePermissionsModule {}
