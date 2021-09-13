import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ConfirmationDialogComponent,
  HeaderComponent,
  ProgressBarComponent,
  SidebarComponent,
} from './components';
import { DefaultLayoutComponent } from './layout';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { RouterModule } from '@angular/router';

const MATERIAL = [
  MatSidenavModule,
  MatProgressBarModule,
  MatListModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
];

const COMPONENTS = [HeaderComponent, ProgressBarComponent, SidebarComponent];

const LAYOUTS = [DefaultLayoutComponent];

@NgModule({
  imports: [CommonModule, RouterModule, ...MATERIAL],
  declarations: [ConfirmationDialogComponent, ...COMPONENTS, ...LAYOUTS],
  exports: [ConfirmationDialogComponent, ...COMPONENTS, ...LAYOUTS],
})
export class SharedUiModule {}
