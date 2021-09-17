import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@smec-monorepo/users/data-access';
import { UpdateUserRoles, UserRoles } from '@smec-monorepo/shared/models';
import { Observable, Subscription } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="userRoles$ | async as data; else empty">
      <app-userinfo [userId]="data.userId"></app-userinfo>
      <app-reset-password [userId]="userId"></app-reset-password>

      <app-manage-roles
        [userRoles]="data"
        (updateRoles)="updateUserRoles($event)"
      ></app-manage-roles>
    </ng-container>

    <ng-template #empty>NO DATA</ng-template>
  `,
})
export class UserSettingsPage implements OnInit {
  userRoles$!: Observable<UserRoles | undefined>;
  userId!: string;

  redirectSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private userRolesService: UserService
  ) {}

  ngOnInit(): void {
    this.getUserRoles();
  }

  getUserRoles() {
    this.route.paramMap.subscribe((params) => {
      this.userId = String(params.get('id'));
      this.userRoles$ = this.userRolesService.getUserRoles(this.userId);
    });
  }

  updateUserRoles(data: UpdateUserRoles) {
    this.userRolesService.updateUserRoles(this.userId, data).subscribe(() => {
      this.userRolesService.showUpdatedUserRolesSnackBar();
      this.getUserRoles();
    });
  }
}
