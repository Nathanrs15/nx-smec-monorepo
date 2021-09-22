import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedAngularMaterialComponentsModule } from '@smec-monorepo/shared/angular-material-components';

import {
  HeaderComponent,
  ProgressBarComponent,
  SidebarComponent,
} from './common';
import { DefaultLayoutComponent } from './layouts';

const COMPONENTS = [HeaderComponent, ProgressBarComponent, SidebarComponent];

const LAYOUTS = [DefaultLayoutComponent];

@NgModule({
  declarations: [...COMPONENTS, ...LAYOUTS],
  imports: [CommonModule, SharedAngularMaterialComponentsModule],
})
export class LayoutModule {}
