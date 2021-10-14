import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';
import {
    ClaimsService,
    PermissionsApiService,
    ResourcesApiService,
} from '../data-access';
import { EditPermissionsComponent } from './components';
import { ResourceFormComponent } from './components/resource-form.component';
import { ResourceAddEditPage } from './pages';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ResourceAddEditPage,
    },
];

const PAGES = [ResourceAddEditPage];

const COMPONENTS = [EditPermissionsComponent, ResourceFormComponent];

const MATERIAL = [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSidenavModule,
];

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
    providers: [ClaimsService, ResourcesApiService, PermissionsApiService],
})
export class FeatureClaimsEditModule {}
