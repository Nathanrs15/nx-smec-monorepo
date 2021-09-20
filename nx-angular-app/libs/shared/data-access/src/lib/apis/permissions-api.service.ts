import { Injectable } from '@angular/core';
import { environment } from '@smec-monorepo/shared/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Permission,
  PermissionGroupByType,
  RolePermissions,
  RolePermissionsByType,
} from '@smec-monorepo/shared/models';

@Injectable({
  providedIn: 'root',
})
export class PermissionsApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

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
    return this.http.post(`${this.baseUrl}/permissions/update/${type}`, data);
  }

  updatePermissions(permissions: Permission[]) {
    return this.http.put(`${this.baseUrl}/permissions/update`, permissions);
  }
}
