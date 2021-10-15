/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
    RolePermissions,
    Role,
    RoleCreate,
    RolePermissionsByType,
    PermissionGroupByType,
    RoleClaimsRequest,
    Resource,
} from './role.model';

import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

import { CheckPermissionService, SnackbarService } from '@shared/utils';
import { environment } from 'environments/environment';

@Injectable()
export class RolesFeatureService {
    private baseUrl = environment.authUrl;

    formNames: string[] = [];

    checkPermissions = {
        canCreateRole: this.checkPermission.hasPermission('Roles.Create'),
        canEditRole: this.checkPermission.hasPermission('Roles.Edit'),
        canDeleteRole: this.checkPermission.hasPermission('Roles.Delete'),
        canViewPermissions:
            this.checkPermission.hasPermission('Permissions.View'),
        canEditPermissions:
            this.checkPermission.hasPermission('Permissions.Edit'),
    };

    constructor(
        private http: HttpClient,
        private fb: FormBuilder,
        private checkPermission: CheckPermissionService,
        private snackbarService: SnackbarService
    ) {}

    getResources(): Observable<Resource[]> {
        return this.http.get<Resource[]>(this.baseUrl + '/resources');
    }

    getAllRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(`${this.baseUrl}/roles`);
    }

    getRoleById(roleId: string): Observable<Role> {
        return this.http.get<Role>(`${this.baseUrl}/roles/${roleId}`);
    }

    createRole(role: RoleCreate): Observable<Role> {
        return this.http.post<Role>(`${this.baseUrl}/roles/create`, role);
    }

    deleteRole(roleId: string) {
        return this.http.delete(`${this.baseUrl}/roles/delete/${roleId}`);
    }

    updateRole(roleId: string, role: Role) {
        return this.http.put(`${this.baseUrl}/roles/${roleId}`, role);
    }

    getRolePermissions(roleId: string): Observable<RolePermissions> {
        return this.http.get<RolePermissions>(
            `${this.baseUrl}/permissions/${roleId}`
        );
    }

    getRolePermissionsGroupByType(
        roleId: string
    ): Observable<PermissionGroupByType[]> {
        return this.http.get<PermissionGroupByType[]>(
            `${this.baseUrl}/permissions/${roleId}/GroupByType`
        );
    }

    getPermissionsByType(
        roleId: string,
        type: string
    ): Observable<RolePermissionsByType> {
        return this.http.get<RolePermissionsByType>(
            `${this.baseUrl}/permissions/${roleId}/${type}`
        );
    }

    updateRolePermissions(type: string, data: RolePermissions) {
        return this.http.post(
            `${this.baseUrl}/permissions/update/${type}`,
            data
        );
    }

    isEquivalent(a: any, b: any) {
        const aProps = Object.getOwnPropertyNames(a);
        const bProps = Object.getOwnPropertyNames(b);

        if (aProps.length !== bProps.length) {
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
            const updateItem = data.find((x) => x.value === name);
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
                return form.dirty && this.isEquivalent(oldValue, value)
                    ? true
                    : false;
            })
        );
    }

    showDeletedRoleSnackBar() {
        this.snackbarService.openSnackBar(
            `Rol eliminado correctamente`,
            'Aceptar'
        );
    }

    showUpdatedPermissionsSnackBar() {
        this.snackbarService.openSnackBar(`Permisos actualizados`, 'Aceptar');
    }
}
