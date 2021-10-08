import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { NgxPermissionsModule } from 'ngx-permissions';

import {
    ChartService,
    DataRecordService,
    TimeBasedGraphService,
} from '../data-access';
import { GraphPage } from './pages';
import {
    FiltersDrawerComponent,
    MiniCardsComponent,
    TimeBasedGraphComponent,
} from './components';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
];

const PAGES = [GraphPage];

const COMPONENTS = [
    TimeBasedGraphComponent,
    FiltersDrawerComponent,
    MiniCardsComponent,
];

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
    providers: [DataRecordService, ChartService, TimeBasedGraphService],
})
export class FeatureGraphModule {}
