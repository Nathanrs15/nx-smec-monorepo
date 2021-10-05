import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseDrawerModule } from '@smec-monorepo/fuse';
import { LayoutComponent } from './layout.component';
import { EmptyLayoutModule } from './layouts/empty/empty.module';
import { CenteredLayoutModule } from './layouts/horizontal/centered/centered.module';
import { EnterpriseLayoutModule } from './layouts/horizontal/enterprise/enterprise.module';
import { MaterialLayoutModule } from './layouts/horizontal/material/material.module';
import { ModernLayoutModule } from './layouts/horizontal/modern/modern.module';
import { ClassicLayoutModule } from './layouts/vertical/classic/classic.module';
import { ClassyLayoutModule } from './layouts/vertical/classy/classy.module';
import { CompactLayoutModule } from './layouts/vertical/compact/compact.module';
import { DenseLayoutModule } from './layouts/vertical/dense/dense.module';
import { FuturisticLayoutModule } from './layouts/vertical/futuristic/futuristic.module';
import { ThinLayoutModule } from './layouts/vertical/thin/thin.module';
import { SettingsModule } from './common/settings/settings.module';

const layoutModules = [
  // Empty
  EmptyLayoutModule,

  // Horizontal navigation
  CenteredLayoutModule,
  EnterpriseLayoutModule,
  MaterialLayoutModule,
  ModernLayoutModule,

  // Vertical navigation
  ClassicLayoutModule,
  ClassyLayoutModule,
  CompactLayoutModule,
  DenseLayoutModule,
  FuturisticLayoutModule,
  ThinLayoutModule,
];

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    MatIconModule,
    MatTooltipModule,
    FuseDrawerModule,
    SettingsModule,
    ...layoutModules,
  ],
  exports: [LayoutComponent, ...layoutModules],
})
export class LayoutModule {}

// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

// import { SharedAngularMaterialComponentsModule } from '@smec-monorepo/shared/angular-material-components';

// import {
//   HeaderComponent,
//   ProgressBarComponent,
//   SidebarComponent,
// } from './common';
// import { DefaultLayoutComponent } from './layouts';
// import { NgxPermissionsModule } from 'ngx-permissions';

// const COMPONENTS = [HeaderComponent, ProgressBarComponent, SidebarComponent];

// const LAYOUTS = [DefaultLayoutComponent];

// const MODULES = [
//   CommonModule,
//   RouterModule,
//   SharedAngularMaterialComponentsModule,
//   NgxPermissionsModule.forRoot(),
// ];

// @NgModule({
//   declarations: [...COMPONENTS, ...LAYOUTS],
//   imports: [...MODULES],
//   exports: [...LAYOUTS],
// })
// export class LayoutModule {}
