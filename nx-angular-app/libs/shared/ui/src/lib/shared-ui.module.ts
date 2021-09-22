import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxPermissionsModule } from 'ngx-permissions';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import {
  CustomEmptyStateComponent,
  UndrawAvatarComponent,
  UndrawEmptyStateComponent,
  UndrawSettingsComponent,
} from './undraw/components';

const MATERIAL = [
  MatSidenavModule,
  MatProgressBarModule,
  MatListModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
  FlexLayoutModule,
  MatButtonModule,
];

const COMPONENTS = [
  UndrawAvatarComponent,
  UndrawSettingsComponent,
  UndrawEmptyStateComponent,
  CustomEmptyStateComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxPermissionsModule.forRoot(),
    ...MATERIAL,
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class SharedUiModule {}