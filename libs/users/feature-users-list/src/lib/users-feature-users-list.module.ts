import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { UsersPage } from './pages';
import { UserListComponent } from './components';

import { UserService } from '@smec-monorepo/users/data-access';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { SharedUiModule } from '@smec-monorepo/shared/ui';
import { NgxPermissionsModule } from 'ngx-permissions';
import { FlexLayoutModule } from '@angular/flex-layout';

const MATERIALMODULES = [
  MatCardModule,
  MatTableModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatListModule,
  MatFormFieldModule,
  FlexLayoutModule,
  MatInputModule,
];

const PAGES = [UsersPage];

const COMPONENTS = [UserListComponent];

const routes: Routes = [
  {
    path: '',
    component: UsersPage,
    data: {
      title: 'Usuarios',
    },
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedUiModule,
    RouterModule.forChild(routes),
    NgxPermissionsModule.forChild(),
    ...MATERIALMODULES,
  ],
  declarations: [...PAGES, ...COMPONENTS],
  providers: [UserService],
})
export class UsersFeatureUsersListModule {}
