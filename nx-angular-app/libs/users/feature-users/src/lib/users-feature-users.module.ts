import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserService } from '@smec-monorepo/users/data-access';
import { UserPage } from './pages';
import {
  UserCardOptionsComponent,
  UserEmptyStateComponent,
  UserFiltersComponent,
  UserListComponent,
  UserLoadingStateComponent,
  UserResponsiveTableComponent,
} from './components';

import { SharedAngularMaterialComponentsModule } from '@smec-monorepo/shared/angular-material-components';

import { SharedUiModule } from '@smec-monorepo/shared/ui';

const COMPONENTS = [
  UserListComponent,
  UserCardOptionsComponent,
  UserFiltersComponent,
  UserLoadingStateComponent,
  UserEmptyStateComponent,
  UserResponsiveTableComponent,
];

const PAGES = [UserPage];

@NgModule({
  declarations: [...PAGES, ...COMPONENTS],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedAngularMaterialComponentsModule,
    SharedUiModule,
    NgxPermissionsModule.forChild(),
  ],
  providers: [UserService],
})
export class UsersFeatureUsersModule {}
