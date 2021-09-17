import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPermissionsModule } from 'ngx-permissions';

import { SharedUiModule } from '@smec-monorepo/shared/ui';
import { SharedAngularMaterialComponentsModule } from '@smec-monorepo/shared/angular-material-components';

import { ResourcesFeatureService } from '@smec-monorepo/claims/data-access';
import { ResourcesPage } from './pages';
import { ResourcesListComponent } from './components';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ResourcesPage },
];

const PAGES = [ResourcesPage];
const COMPONENTS = [ResourcesListComponent];

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
export class ClaimsFeatureClaimsModule {}
