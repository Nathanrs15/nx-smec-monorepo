import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedAngularMaterialComponentsModule } from '@smec-monorepo/shared/angular-material-components';

import {
  HeaderComponent,
  ProgressBarComponent,
  SidebarComponent,
} from './common';
import { DefaultLayoutComponent } from './layouts';
import { NgxPermissionsModule } from 'ngx-permissions';

const COMPONENTS = [HeaderComponent, ProgressBarComponent, SidebarComponent];

const LAYOUTS = [DefaultLayoutComponent];

const MODULES = [
  CommonModule,
  RouterModule,
  SharedAngularMaterialComponentsModule,
  NgxPermissionsModule.forRoot(),
];

@NgModule({
  declarations: [...COMPONENTS, ...LAYOUTS],
  imports: [...MODULES],
  exports: [...LAYOUTS],
})
export class LayoutModule {}
