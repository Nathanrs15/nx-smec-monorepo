/* eslint-disable arrow-body-style */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  RoleClaimsRequest,
  RolePermissionsByType,
  RolesFeatureService,
} from '../../data-access';

@Component({
  template: `
    <ng-container *ngIf="rolepermissionsByType$ | async as data; else empty">
      <div class="flex-auto p-6 sm:p-10">
        <div class="max-w-3xl">
          <app-manage-permissions
            [data]="data"
            [resourceName]="type"
            (update)="updateData($event)"
          >
          </app-manage-permissions>
        </div>
      </div>
    </ng-container>
    <ng-template #empty> NO DATA </ng-template>
  `,
  styles: [],
})
export class PermissionsPage implements OnInit {
  rolepermissionsByType$!: Observable<RolePermissionsByType>;

  roleId!: string;
  type!: string;

  constructor(
    private route: ActivatedRoute,
    private roleService: RolesFeatureService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const child = this.route.paramMap.pipe(
      map((params) => {
        this.type = String(params.get('type'));

        return this.type;
      })
    );

    let parent: Observable<string>;

    if (this.route.parent) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      parent = this.route.parent.paramMap.pipe(
        map((params) => {
          this.roleId = String(params.get('id'));
          return this.roleId;
        })
      )!;

      this.rolepermissionsByType$ = combineLatest([child, parent]).pipe(
        map(([type, role]) => {
          return { type, role };
        }),
        switchMap((data) =>
          this.roleService.getPermissionsByType(data.role, data.type)
        )
      );
    }
  }

  updateData(permissions: RoleClaimsRequest[]) {
    const data = { roleId: this.roleId, roleClaims: permissions };
    return this.roleService
      .updateRolePermissions(this.type, data)
      .subscribe(() => {
        this.roleService.showUpdatedPermissionsSnackBar();
        this.getData();
      });
  }
}
