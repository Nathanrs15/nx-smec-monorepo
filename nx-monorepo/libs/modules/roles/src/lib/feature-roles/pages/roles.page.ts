import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Role, RolesFeatureService } from '../../data-access';

@Component({
  template: `
    <ng-container *ngIf="roles$ | async as roles; else empty">
      <div class="flex flex-col flex-auto w-full">
        <div class="flex flex-wrap w-full max-w-screen-xl mx-auto p-6 md:p-8">
          <!-- Title and action buttons -->
          <div class="flex items-center justify-between w-full">
            <div>
              <div class="text-3xl font-semibold tracking-tight leading-8">
                Roles
              </div>
              <div class="font-medium tracking-tight text-secondary">
                <ng-container *ngIf="roles.length">
                  {{ roles.length }} roles en total
                </ng-container>
              </div>
            </div>
            <div class="flex items-center ml-6">
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
                  [placeholder]="'Buscar roles'"
                />
              </mat-form-field>
              <button
                class="ml-4"
                mat-flat-button
                [color]="'primary'"
                routerLink="add-role"
              >
                <mat-icon [svgIcon]="'heroicons_outline:plus'"></mat-icon>
                <span class="ml-2 mr-1">Añadir</span>
              </button>
            </div>
          </div>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-8"
          >
            <div
              class="sm:col-span-6 flex flex-col flex-auto p-6 bg-card shadow rounded-2xl overflow-hidden"
            >
              <div
                class="text-lg font-medium tracking-tight leading-6 truncate"
              >
                Lista de roles
              </div>
              <div class="flex flex-col flex-auto mt-2 overflow-x-auto">
                <app-roles-list
                  [roles]="roles"
                  [hasPermission]="hasPermission"
                ></app-roles-list>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-container>

    <ng-template #empty>NO DATA</ng-template>
  `,
})
export class RolesPage implements OnInit {
  roles$!: Observable<Role[]>;
  hasPermission = this.rolesService.checkPermissions;

  constructor(private rolesService: RolesFeatureService) {}

  ngOnInit(): void {
    this.getRolesList();
  }

  getRolesList() {
    this.roles$ = this.rolesService.getAllRoles();
  }
}
