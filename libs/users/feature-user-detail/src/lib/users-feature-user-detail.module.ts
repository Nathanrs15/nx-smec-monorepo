import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserDetailPage } from './user-detail/user-detail.page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: ':id', pathMatch: 'full', component: UserDetailPage },
    ]),
  ],
  declarations: [UserDetailPage],
})
export class UsersFeatureUserDetailModule {}
