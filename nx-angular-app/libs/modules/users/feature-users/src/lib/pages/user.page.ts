import { Component, OnInit } from '@angular/core';
import { UIStatus } from '@smec-monorepo/shared/utils';
import { User } from '@smec-monorepo/modules-users-data-access';
import { Observable } from 'rxjs';
import { UserService } from '@smec-monorepo/modules-users-data-access';

@Component({
  template: `
    <ng-container *ngIf="UIState$ | async as state">
      <!-- empty state -->
      <ng-container *ngIf="state === UIStates.empty"> </ng-container>

      <!-- loading state -->
      <ng-container *ngIf="state === UIStates.loading">
        <app-user-loading-state></app-user-loading-state>
      </ng-container>

      <!-- loaded state -->
      <ng-container *ngIf="users$ | async as users">
        <ng-container *ngIf="state === UIStates.loaded">
          <h2 class="view-title">Administración de usuarios</h2>
          <app-user-responsive-table [users]="users">
          </app-user-responsive-table>
        </ng-container>
      </ng-container>
    </ng-container>
  `,
})
export class UserPage implements OnInit {
  users$!: Observable<User[]>;
  UIState$!: Observable<UIStatus>;

  UIStates = UIStatus;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.UIState$ = this.userService.UIState$;
    this.users$ = this.userService.getAllUsers();
  }
}