import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { NgxPermissionsModule } from 'ngx-permissions';

import {
  ChartService,
  HistoryGraphService,
  TimeBasedGraphService,
} from '../data-access';
import { GraphPage } from './pages';
import { FiltersDrawerComponent, TimeBasedGraphComponent } from './components';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { FuseFindByKeyPipeModule } from '@smec-monorepo/fuse';

const routes: Routes = [{ path: '', component: GraphPage }];

const MATERIAL = [
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  FuseFindByKeyPipeModule,
];

const PAGES = [GraphPage];

const COMPONENTS = [TimeBasedGraphComponent, FiltersDrawerComponent];

const MODULES = [
  CommonModule,
  RouterModule.forChild(routes),
  FormsModule,
  ReactiveFormsModule,
  NgxPermissionsModule.forChild(),
];

@NgModule({
  declarations: [...PAGES, ...COMPONENTS],
  imports: [...MODULES, ...MATERIAL],
  providers: [HistoryGraphService, ChartService, TimeBasedGraphService],
})
export class FeatureGraphModule {}
