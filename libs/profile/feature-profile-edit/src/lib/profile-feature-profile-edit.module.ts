import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilePage } from './pages';
import {
  ChangePasswordComponent,
  ChangeThemeComponent,
  ChangeUserDataComponent,
} from './components';

import { SharedUiModule } from '@smec-monorepo/shared/ui';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

import { ProfileService } from './services';
import { FlexLayoutModule } from '@angular/flex-layout';

const PAGES = [ProfilePage];

const COMPONENTS = [
  ChangeUserDataComponent,
  ChangePasswordComponent,
  ChangeThemeComponent,
];

const MATERIAL = [
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule,
  MatButtonModule,
  FlexLayoutModule,
];

@NgModule({
  declarations: [...PAGES, ...COMPONENTS],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedUiModule,
    ...MATERIAL,
  ],
  providers: [ProfileService],
})
export class ProfileFeatureProfileEditModule {}
