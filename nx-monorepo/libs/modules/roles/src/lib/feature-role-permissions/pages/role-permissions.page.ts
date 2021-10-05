import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridBreakpointService } from '@smec-monorepo/shared';
import { Observable } from 'rxjs';
import { Resource, Role, RolesFeatureService } from '../../data-access';

@Component({
  template: `
    <ng-container *ngIf="resources$ | async as resources; else empty">
      <div class="flex flex-col flex-auto min-w-0">
        <!-- Header -->
        <div class="bg-card">
          <div
            class="flex flex-col w-full max-w-screen-xl mx-auto px-6 sm:px-8"
          >
            <div
              class="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 my-8 sm:my-12"
            >
              <div class="flex flex-auto items-center min-w-0">
                <div class="flex flex-col min-w-0 ml-4">
                  <!-- Breadcrumbs -->
                  <div class="flex flex-wrap items-center font-medium">
                    <div>
                      <a
                        class="whitespace-nowrap text-primary-500"
                        [routerLink]="['/app/roles']"
                        >Roles</a
                      >
                    </div>
                    <div class="flex items-center ml-1 whitespace-nowrap">
                      <mat-icon
                        class="icon-size-5 text-secondary"
                        [svgIcon]="'heroicons_solid:chevron-right'"
                      ></mat-icon>
                      <div>Administrar permisos</div>
                    </div>
                  </div>
                  <!-- Title -->
                  <div class="mt-2">
                    <h2
                      class="text-3xl md:text-4xl font-extrabold tracking-tight leading-7 sm:leading-10 truncate"
                    >
                      Roles
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <!-- Project selector -->
            <div
              class="relative flex self-start pt-2 pb-1 pl-5 pr-4 cursor-pointer overflow-hidden rounded-t-xl border border-b-0 bg-default"
              matRipple
            >
              <app-resource-selection
                [resources]="resources"
              ></app-resource-selection>
            </div>
          </div>
        </div>
        <!-- Main -->

        <router-outlet> </router-outlet>
      </div>
    </ng-container>
    <ng-template #empty>NO DATA</ng-template>
  `,
  styles: [],
})
export class RolePermissionsPage implements OnInit {
  roleId!: string;
  breakpoint$ = this.breakpointService.breakpoint$;

  resources$!: Observable<Resource[]>;
  role$!: Observable<Role>;

  constructor(
    private rolesService: RolesFeatureService,
    private breakpointService: GridBreakpointService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.roleId = this.route.snapshot.params['id'];
    this.getData();
  }

  getData() {
    this.resources$ = this.rolesService.getResources();
    this.role$ = this.rolesService.getRoleById(this.roleId);
  }
}
