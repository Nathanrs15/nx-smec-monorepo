import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  RolePermissions,
  Role,
  RoleCreate,
  RolePermissionsByType,
  PermissionGroupByType,
  RoleClaimsRequest,
  Resource,
  Confirmation,
} from '@smec-monorepo/shared/models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import {
  CheckPermissionService,
  SnackbarService,
} from '@smec-monorepo/shared/utils';
import {
  PermissionsApiService,
  ResourcesApiService,
  RolesApiService,
} from '@smec-monorepo/shared/data-access';

@Injectable()
export class RolesFeatureService {
  formNames: string[] = [];

  dialogOptions: Confirmation = {
    title: '¿Eliminar rol?',
    message: 'El rol será eliminado permanentemente.',
    cancelText: 'Cancelar',
    confirmText: 'Eliminar',
  };

  checkPermissions = {
    canCreateRole: this.checkPermission.hasPermission('Roles.Create'),
    canEditRole: this.checkPermission.hasPermission('Roles.Edit'),
    canDeleteRole: this.checkPermission.hasPermission('Roles.Delete'),
    canViewPermissions: this.checkPermission.hasPermission('Permissions.View'),
    canEditPermissions: this.checkPermission.hasPermission('Permissions.Edit'),
  };

  constructor(
    private fb: FormBuilder,
    private checkPermission: CheckPermissionService,
    private snackbarService: SnackbarService,
    private resourcesApi: ResourcesApiService,
    private rolesApi: RolesApiService,
    private permissionsAPi: PermissionsApiService
  ) {}

  getResources(): Observable<Resource[]> {
    return this.resourcesApi.getResources();
  }

  getAllRoles(): Observable<Role[]> {
    return this.rolesApi.getAllRoles();
  }

  getRoleById(roleId: string): Observable<Role> {
    return this.rolesApi.getRoleById(roleId);
  }

  createRole(role: RoleCreate): Observable<Role> {
    return this.rolesApi.createRole(role);
  }

  deleteRole(roleId: string) {
    return this.rolesApi.deleteRole(roleId);
  }

  updateRole(roleId: string, role: Role) {
    return this.rolesApi.updateRole(roleId, role);
  }

  getRolePermissions(roleId: string): Observable<RolePermissions> {
    return this.permissionsAPi.getRolePermissions(roleId);
  }

  getRolePermissionsGroupByType(
    roleId: string
  ): Observable<PermissionGroupByType[]> {
    return this.permissionsAPi.getRolePermissionsGroupByType(roleId);
  }

  getPermissionsByType(
    roleId: string,
    type: string
  ): Observable<RolePermissionsByType> {
    return this.permissionsAPi.getPermissionsByType(roleId, type);
  }

  updateRolePermissions(type: string, data: RolePermissions) {
    return this.permissionsAPi.updateRolePermissions(type, data);
  }

  isEquivalent(a: any, b: any) {
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
      return false;
    }

    for (let i = 0; i < aProps.length; i++) {
      const propName = aProps[i];

      if (a[propName] !== b[propName]) {
        return false;
      }
    }

    return true;
  }

  updateRoleClaimsValues(data: RoleClaimsRequest[], form: FormGroup) {
    this.formNames.forEach((name) => {
      const updateItem = data.find((x) => x.value == name);
      if (updateItem) {
        updateItem.selected = form.controls[name].value;

        const index = data.indexOf(updateItem);
        data[index] = updateItem;
      }
    });

    return data;
  }

  createGroup(data: RoleClaimsRequest[], canEdit: boolean) {
    const group = this.fb.group({});
    data.forEach((control) =>
      group.addControl(
        control.value,
        this.fb.control({ value: control.selected, disabled: !canEdit })
      )
    );
    return group;
  }

  disableForm(form: FormGroup): Observable<boolean> {
    const oldValue = form.value;

    return form.valueChanges.pipe(
      map((value) => {
        return form.dirty && this.isEquivalent(oldValue, value) ? true : false;
      })
    );
  }

  showDeletedRoleSnackBar() {
    this.snackbarService.openSnackBar(`Rol eliminado correctamente`, 'Aceptar');
  }

  showUpdatedPermissionsSnackBar() {
    this.snackbarService.openSnackBar(`Permisos actualizados`, 'Aceptar');
  }
}
