import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateUserRoles, UserRoles } from '@smec-monorepo/shared/models';
import { environment } from '@smec-monorepo/shared/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserRolesApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUserRoles(userId: string): Observable<UserRoles> {
    return this.http.get<UserRoles>(this.baseUrl + '/userroles/' + userId);
  }

  updateUserRoles(userId: string, data: UpdateUserRoles) {
    console.log('updateUserRoles', data);

    return this.http.post<UserRoles>(
      this.baseUrl + '/userroles/update/' + userId,
      data
    );
  }
}
