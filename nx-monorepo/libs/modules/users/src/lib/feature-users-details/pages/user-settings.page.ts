import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UpdateUserRoles, UserRoles, UserService } from '../../data-access';

import { Observable, Subscription } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="userRoles$ | async as data; else empty">
      <div class="flex flex-col flex-auto min-w-0">
        <!-- Header -->
        <div
          class="flex flex-col sm:flex-row flex-0 sm:items-center sm:justify-between p-6 sm:py-8 sm:px-10 border-b bg-card dark:bg-transparent"
        >
          <div class="flex-1 min-w-0">
            <!-- Breadcrumbs -->
            <div class="flex flex-wrap items-center font-medium">
              <div>
                <a
                  class="whitespace-nowrap text-primary-500"
                  [routerLink]="['/app/users']"
                  >Usuarios</a
                >
              </div>
              <div class="flex items-center ml-1 whitespace-nowrap">
                <mat-icon
                  class="icon-size-5 text-secondary"
                  [svgIcon]="'heroicons_solid:chevron-right'"
                ></mat-icon>
                <div>Editar usuario</div>
              </div>
            </div>
            <!-- Title -->
            <div class="mt-2">
              <h2
                class="text-3xl md:text-4xl font-extrabold tracking-tight leading-7 sm:leading-10 truncate"
              >
                Usuarios
              </h2>
            </div>
          </div>
        </div>

        <!-- Main -->
        <div class="flex-auto p-6 sm:p-10">
          <div class="max-w-3xl">
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
