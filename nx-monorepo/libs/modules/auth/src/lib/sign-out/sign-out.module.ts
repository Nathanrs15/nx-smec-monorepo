import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FuseCardModule } from '@fuse/components/card';
import { AuthSignOutComponent } from './sign-out.component';
import { authSignOutRoutes } from './sign-out.routing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthSignOutComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(authSignOutRoutes),
    MatButtonModule,
    FuseCardModule,
  ],
})
export class AuthSignOutModule {}
