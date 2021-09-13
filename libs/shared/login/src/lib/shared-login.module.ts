import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ThemeToggleModule } from '@shared/modules';
import { LoginFormComponent } from './components';
import { LoginPage } from './pages';
// import { AngularMaterialModule } from '@core/angular-material.module';
// import { UndrawModule } from '@shared/undraw';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

const COMPONENTS = [LoginFormComponent];

const PAGES = [LoginPage];

const MATERIRAL = [
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
];

const MODULES = [
  CommonModule,
  LoginRoutingModule,
  FormsModule,
  ReactiveFormsModule,
  // ThemeToggleModule,
  // AngularMaterialModule,
  // UndrawModule,
];

@NgModule({
  declarations: [...COMPONENTS, ...PAGES],
  imports: [...MODULES, ...MATERIRAL],
})
export class SharedLoginModule {}
