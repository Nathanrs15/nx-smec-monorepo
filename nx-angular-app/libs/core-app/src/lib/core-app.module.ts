import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

import { AuthInterceptor } from './auth';

import { NgxPermissionsModule } from 'ngx-permissions';
import { IconsModule } from './icons/icons.module';

const PROVIDERS = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: MAT_DATE_LOCALE, useValue: 'es' },
  {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
  },
  { provide: LOCALE_ID, useValue: 'es' },
];

const OVERLAY = [
  MatSnackBarModule,
  MatDialogModule,
  MatTooltipModule,
  MatMenuModule,
];

const MODULES = [
  CommonModule,
  IconsModule,
  HttpClientModule,
  NgxPermissionsModule.forRoot(),
];

@NgModule({
  imports: [...MODULES, ...OVERLAY],
  exports: [...OVERLAY],
  providers: [...PROVIDERS],
})
export class CoreAppModule {}
