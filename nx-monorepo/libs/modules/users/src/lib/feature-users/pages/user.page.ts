import { Component, OnInit } from '@angular/core';
import { UIStatus } from '@smec-monorepo/shared';
import { Observable } from 'rxjs';
import { UserService, User } from '../../data-access';

@Component({
  template: `
    <div
      class="sm:absolute sm:inset-0 flex flex-col flex-auto min-w-0 sm:overflow-hidden bg-card dark:bg-transparent"
    >
      <ng-container *ngIf="UIState$ | async as state">
        <!-- empty state -->
        <ng-container *ngIf="state === UIStates.empty">
          No hay nada
        </ng-container>

        <!-- loading state -->
        <ng-container *ngIf="state === UIStates.loading">
          <!-- <app-user-loading-state></app-user-loading-state> -->
          Cargando ...
        </ng-container>

        <!-- loaded state -->
        <ng-container *ngIf="users$ | async as users">
          <ng-container *ngIf="state === UIStates.loaded">
            <!-- Header -->
            <div
              class="relative flex flex-col sm:flex-row flex-0 sm:items-center sm:justify-between py-8 px-6 md:px-8 border-b"
            >
              <!-- Title -->
              <div>
                <div class="text-4xl font-extrabold tracking-tight">
                  Usuarios
                </div>
                <div
                  class="flex items-center mt-0.5 font-medium text-secondary"
                >
                  <ng-container *ngIf="users.length">
                    {{ users.length }} usuarios en total
                  </ng-container>
                </div>
              </div>
              <!-- Actions -->
              <div class="flex flex-shrink-0 items-center mt-6 sm:mt-0 sm:ml-4">
                <!-- Search -->
                <mat-form-field
                  class="fuse-mat-dense fuse-mat-no-subscript fuse-mat-rounded min-w-64"
                >
                  <mat-icon
                    class="icon-size-5"
                    matPrefix
                    [svgIcon]="'heroicons_solid:search'"
                  ></mat-icon>
                  <input
                    matInput
                    [autocomplete]="'off'"
                    [placeholder]="'Buscar usuarios'"
                  />
                </mat-form-field>
                <!-- Add product button -->
                <button
                  class="ml-4"
                  mat-flat-button
                  [color]="'primary'"
                  routerLink="./add-user"
                >
                  <mat-icon [svgIcon]="'heroicons_outline:plus'"></mat-icon>
                  <span class="ml-2 mr-1">Añadir</span>
                </button>
              </div>
            </div>

            <!-- Main -->
            <div class="flex flex-auto overflow-hidden">
              <div class="grid">
                <app-user-list [users]="users"> </app-user-list>
              </div>
            </div>
          </ng-container>
        </ng-container>
      </ng-container>
    </div>
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
