import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridBreakpointService } from '@smec-monorepo/shared/utils';
import { Resource, Role } from '@smec-monorepo/modules-roles-data-acess';
import { Observable } from 'rxjs';
import { RolesFeatureService } from '@smec-monorepo/modules-roles-data-acess';

@Component({
  template: `
    <ng-container *ngIf="resources$ | async as resources; else empty">
      <h2 class="view-title" *ngIf="role$ | async as role">
        Añadir permisos al rol {{ role.name }}
      </h2>
      <mat-card>
        <app-resource-selection
          [resources]="resources"
        ></app-resource-selection>
      </mat-card>
      <router-outlet> </router-outlet>
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
