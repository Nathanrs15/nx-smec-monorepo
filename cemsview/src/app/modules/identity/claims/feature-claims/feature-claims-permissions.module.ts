import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ResourcesListComponent } from './components';
import { ResourcesPage } from './pages';

import { RouterModule, Routes } from '@angular/router';
import {
    ClaimsService,
    PermissionsApiService,
    ResourcesApiService,
} from '../data-access';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const COMPONENTS = [ResourcesListComponent];

const PAGES = [ResourcesPage];

const MATERIAL = [
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
];

const routes: Routes = [
    {
        path: '',
        component: ResourcesPage,
    },
];

@NgModule({
    declarations: [...COMPONENTS, ...PAGES],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        NgxPermissionsModule.forChild(),
        ...MATERIAL,
    ],
    providers: [ClaimsService, ResourcesApiService, PermissionsApiService],
})
export class FeatureClaimssModule {}
