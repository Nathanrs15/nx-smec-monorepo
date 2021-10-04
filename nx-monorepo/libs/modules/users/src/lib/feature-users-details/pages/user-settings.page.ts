import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UpdateUserRoles, UserRoles, UserService } from '../../data-access';

import { Observable, Subscription } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="userRoles$ | async as data; else empty">
      <div
        class="sm:absolute sm:inset-0 flex flex-col flex-auto min-w-0 sm:overflow-hidden bg-card dark:bg-transparent"
      >
        <!-- Header -->
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between p-6 sm:py-12 md:px-8 border-b bg-card dark:bg-transparent"
        >
          <!-- Title -->
          <div>
            <div class="text-4xl font-extrabold tracking-tight leading-none">
              Usuarios
            </div>
            <div class="flex items-center mt-0.5 font-medium text-secondary">
              <!-- Breadcrumbs -->
              <div class="flex items-center space-x-2">
                <a
                  class="text-primary cursor-pointer"
                  [routerLink]="['/app/users']"
                  >Usuarios
                </a>
                <div class="">/</div>
                <div>Editar usuario</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main -->
        <div class="flex flex-auto overflow-hidden">
          <div class="grid">
            <app-userinfo [userId]="data.userId"></app-userinfo>
            <app-reset-password [userId]="userId"></app-reset-password>

            <app-manage-roles
              [userRoles]="data"
              (updateRoles)="updateUserRoles($event)"
            ></app-manage-roles>
          </div>
        </div>
      </div>
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
