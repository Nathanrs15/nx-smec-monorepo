import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPermissionsModule } from 'ngx-permissions';

import { SharedUiModule } from '@smec-monorepo/shared/ui';
import { SharedAngularMaterialComponentsModule } from '@smec-monorepo/shared/angular-material-components';

import { RolesFeatureService } from '@smec-monorepo/roles/data-access';

import { RolesPage } from './pages';
import { RolesListComponent } from './components';

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
    SharedAngularMaterialComponentsModule,
    SharedUiModule,
  ],
  providers: [RolesFeatureService],
})
export class RolesFeatureRolesModule {}
