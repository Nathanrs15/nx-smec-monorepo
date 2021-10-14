import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permission, Resource } from './resource.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SnackbarService } from '@shared/utils';
import { ResourcesApiService } from './resources-api.service';
import { PermissionsApiService } from './permissions-api.service';

@Injectable()
export class ClaimsService {
    formNames!: string[];

    constructor(
        private fb: FormBuilder,
        private snackbarService: SnackbarService,
        private resorucesApi: ResourcesApiService,
        private permissionsApi: PermissionsApiService
    ) {}

    getResources(): Observable<Resource[]> {
        return this.resorucesApi.getResources();
    }

    getResourceById(resourceId: string): Observable<Resource> {
        return this.resorucesApi.getResourceById(resourceId);
    }

    getResourcePermissions(resourceId: string): Observable<Permission[]> {
        return this.resorucesApi.getResourcePermissions(resourceId);
    }

    updateResource(id: string, resource: Resource) {
        return this.resorucesApi.updateResource(id, resource);
    }

    createResource(resource: Resource) {
        return this.resorucesApi.createResource(resource);
    }

    updatePermissions(permissions: Permission[]) {
        return this.permissionsApi.updatePermissions(permissions);
    }

    updatePermissionsValues(permissions: Permission[], form: FormGroup) {
        this.formNames.forEach((name) => {
            const updateItem = permissions.find((x) => x.value === name);
            if (updateItem !== undefined) {
                updateItem.description = form.controls[name].value;

                const index = permissions.indexOf(updateItem);
                permissions[index] = updateItem;
            }
        });

        return permissions;
    }

    createFormGroup(data: Permission[]) {
        const group = this.fb.group({});
        data.forEach((control) => {
            group.addControl(
                control.value,
                this.fb.control(control.description)
            );
        });
        return group;
    }

    showUpdatedPermissionsSnackBar() {
        this.snackbarService.openSnackBar(`Permisos actualizados`, 'Aceptar');
    }
}
