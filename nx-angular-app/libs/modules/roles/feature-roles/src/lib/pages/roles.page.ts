import { Component, OnInit } from '@angular/core';
import { Role } from '@smec-monorepo/modules-roles-data-acess';
import { Observable } from 'rxjs';
import { RolesFeatureService } from '@smec-monorepo/modules-roles-data-acess';

@Component({
  template: `
    <ng-container *ngIf="roles$ | async as roles; else empty">
      <app-roles-list
        [roles]="roles"
        (update)="getRolesList()"
      ></app-roles-list>
    </ng-container>

    <ng-template #empty>NO DATA</ng-template>
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
