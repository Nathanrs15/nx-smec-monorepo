import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Permission, Resource } from './resource.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SnackbarService } from '@smec-monorepo/shared/utils';

import { environment } from '@smec-monorepo/shared/environments';

import { switchMap } from 'rxjs/operators';

@Injectable()
export class ResourcesFeatureService {
  private baseUrl = environment.apiUrl;

  formNames!: string[];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private snackbarService: SnackbarService
  ) {}

  getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(this.baseUrl + '/resources');
  }

  getResourceById(resourceId: string): Observable<Resource> {
    return this.http.get<Resource>(this.baseUrl + '/resources/' + resourceId);
  }

  getResourcePermissions(resourceId: string): Observable<Permission[]> {
    return this.http.get<Permission[]>(
      `${this.baseUrl}/resources/${resourceId}/permissions`
    );
  }

  updateResource(id: string, resource: Resource) {
    const updateResource = this.http.put<Resource>(
      this.baseUrl + '/resources/' + id,
      resource
    );
    const updatePermissions = this.http.put<Resource>(
      this.baseUrl + '/resources/' + id + '/permissions',
      resource
    );
    return updateResource.pipe(switchMap(() => updatePermissions));
  }

  createResource(resource: Resource) {
    const resources = this.http.post<Resource>(
      this.baseUrl + '/resources/create',
      resource
    );
    const permissions = (resource: Resource) =>
      this.http.post(this.baseUrl + '/resources/permissions', resource);

    return resources.pipe(switchMap((result) => permissions(result)));
  }

  updatePermissionsValues(permissions: Permission[], form: FormGroup) {
    this.formNames.forEach((name) => {
      const updateItem = permissions.find((x) => x.value == name);
      if (updateItem !== undefined) {
        updateItem.description = form.controls[name].value;

        const index = permissions.indexOf(updateItem);
        permissions[index] = updateItem;
      }
    });

    return permissions;
  }

  updatePermissions(permissions: Permission[]) {
    return this.http.put(`${this.baseUrl}/permissions/update`, permissions);
  }

  createFormGroup(data: Permission[]) {
    const group = this.fb.group({});
    data.forEach((control) => {
      group.addControl(control.value, this.fb.control(control.description));
    });
    return group;
  }

  showUpdatedPermissionsSnackBar() {
    this.snackbarService.openSnackBar(`Permisos actualizados`, 'Aceptar');
  }
}
