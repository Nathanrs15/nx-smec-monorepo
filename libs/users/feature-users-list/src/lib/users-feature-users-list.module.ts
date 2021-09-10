import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { UsersPage } from './pages';
import { UserListComponent } from './components';

const MATERIALMODULES = [MatCardModule];

const PAGES = [UsersPage];

const COMPONENTS = [UserListComponent];

const routes: Routes = [{ path: '', component: UsersPage }];

@NgModule({
  imports: [CommonModule, ...MATERIALMODULES, RouterModule.forChild(routes)],
  declarations: [...PAGES, ...COMPONENTS],
})
export class UsersFeatureUsersListModule {}
