import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ThemeToggleModule } from '@shared/modules';
import { LoginFormComponent } from './components';
import { LoginPage } from './pages';
// import { UndrawModule } from '@shared/undraw';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

import { SharedUiModule } from '@smec-monorepo/shared/ui';

const COMPONENTS = [LoginFormComponent];

const PAGES = [LoginPage];

const MATERIRAL = [
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  FlexLayoutModule,
  MatButtonModule,
];

const MODULES = [
  CommonModule,
  LoginRoutingModule,
  FormsModule,
  ReactiveFormsModule,
  SharedUiModule,
  // ThemeToggleModule,
  // AngularMaterialModule,
  // UndrawModule,
];

@NgModule({
  declarations: [...COMPONENTS, ...PAGES],
  imports: [...MODULES, ...MATERIRAL],
})
export class SharedLoginModule {}
