import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { CoreAppModule } from '@smec-monorepo/core-app';
import { LayoutModule } from '@smec-monorepo/layout';

const MODULES = [
  BrowserModule,
  BrowserAnimationsModule,
  AppRoutingModule,
  CoreAppModule,
  LayoutModule,
];

@NgModule({
  declarations: [AppComponent],
  imports: [...MODULES],
  bootstrap: [AppComponent],
})
export class AppModule {}
