import { NgModule, LOCALE_ID, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

import { NgxPermissionsModule } from 'ngx-permissions';
import { AuthModule } from './auth/auth.module';
import { IconsModule } from './icons/icons.module';
import { TranslocoCoreModule } from './transloco/transloco.module';

const PROVIDERS = [
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
  AuthModule,
  IconsModule,
  TranslocoCoreModule,
  NgxPermissionsModule.forRoot(),
];

@NgModule({
  imports: [...MODULES, ...OVERLAY],
  exports: [...OVERLAY],
  providers: [...PROVIDERS],
})
export class CoreAppModule {
  constructor(
    @Optional() @SkipSelf() parentModule?: CoreAppModule
)
{
    // Do not allow multiple injections
    if ( parentModule )
    {
        throw new Error('CoreModule has already been loaded. Import this module in the AppModule only.');
    }
}
}
