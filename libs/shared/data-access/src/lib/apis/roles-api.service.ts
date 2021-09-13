import { Injectable } from '@angular/core';
import { environment } from '@smec-monorepo/shared/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role, RoleCreate, Resource } from '@smec-monorepo/shared/models';

@Injectable({
  providedIn: 'root',
})
export class RolesApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

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
}
