import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Role, RolesFeatureService } from '../../data-access';

@Component({
  template: `
    <div
      class="sm:absolute sm:inset-0 flex flex-col flex-auto min-w-0 sm:overflow-hidden bg-card dark:bg-transparent"
    >
      <ng-container *ngIf="roles$ | async as roles; else empty">
        <!-- Header -->
        <div
          class="relative flex flex-col sm:flex-row flex-0 sm:items-center sm:justify-between py-8 px-6 md:px-8 border-b"
        >
          <!-- Title -->
          <div>
            <div class="text-4xl font-extrabold tracking-tight">Roles</div>
            <div class="flex items-center mt-0.5 font-medium text-secondary">
              <ng-container *ngIf="roles.length">
                {{ roles.length }} roles en total
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
                [placeholder]="'Buscar roles'"
              />
            </mat-form-field>
            <!-- Add role button -->
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

        <!-- Main -->
        <div class="flex flex-auto overflow-hidden">
          <div class="grid">
            <app-roles-list
              [roles]="roles"
              (update)="getRolesList()"
            ></app-roles-list>
          </div>
        </div>
      </ng-container>

      <ng-template #empty>NO DATA</ng-template>
    </div>
  `,
  styles: [''],
})
export class RolesPage implements OnInit {
  roles$!: Observable<Role[]>;

  constructor(private rolesService: RolesFeatureService) {}

  ngOnInit(): void {
    this.getRolesList();
  }

  getRolesList() {
    this.roles$ = this.rolesService.getAllRoles();
  }
}
