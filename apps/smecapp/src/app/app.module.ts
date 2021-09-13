import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxPermissionsModule } from 'ngx-permissions';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DefaultLayoutComponent } from './layout';
import {
  HeaderComponent,
  ProgressBarComponent,
  SidebarComponent,
} from './components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

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

const COMPONENTS = [HeaderComponent, ProgressBarComponent, SidebarComponent];

const LAYOUTS = [DefaultLayoutComponent];

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('@smec-monorepo/shared/login').then((m) => m.SharedLoginModule),
  },
  {
    path: 'app',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@smec-monorepo/users/shell-web').then(
            (m) => m.UsersShellWebModule
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'app', pathMatch: 'full' },
];

@NgModule({
  declarations: [AppComponent, ...COMPONENTS, ...LAYOUTS],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    NgxPermissionsModule.forRoot(),
    ...MATERIAL,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
