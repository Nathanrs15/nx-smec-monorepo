import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPermissionsModule } from 'ngx-permissions';

import { SharedUiModule } from '@smec-monorepo/shared/ui';
import { SharedAngularMaterialComponentsModule } from '@smec-monorepo/shared/angular-material-components';

import { ResourcesFeatureService } from '@smec-monorepo/modules-claims-data-access';
import { ResourceAddEditPage } from './pages';
import { EditPermissionsComponent } from './components';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ResourceAddEditPage },
];

const PAGES = [ResourceAddEditPage];
const COMPONENTS = [EditPermissionsComponent];

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
  providers: [ResourcesFeatureService],
})
export class ModulesClaimsFeatureClaimsEditModule {}
