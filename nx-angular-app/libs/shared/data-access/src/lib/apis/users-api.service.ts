import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserCreate, UserInfo } from '@smec-monorepo/shared/models';
import { environment } from '@smec-monorepo/shared/environments';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { AuthenticationService } from '../auth';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private baseUrl = environment.apiUrl;
  private token: string = jwt_decode(
    this.authService.getAuth()?.token as string
  );
  private loggedUserId = this.token.sub.toString();

  constructor(
    private http: HttpClient,
    public authService: AuthenticationService
  ) {}

  getUserById(id: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(this.baseUrl + '/users/' + id);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      this.baseUrl + '/users/' + this.loggedUserId + '/all'
    );
  }

  createUser(user: UserCreate) {
    return this.http.post(this.baseUrl + '/users/create', user);
  }

  deleteUserById(userId: string) {
    return this.http.delete(this.baseUrl + '/users/delete/' + userId);
  }

  resettUserPassword(userId: string, password: any) {
    return this.http.post(
      `${this.baseUrl}/users/reset/password/${userId}`,
      password
    );
  }

  updatePassord(userId: string, password: any) {
    return this.http.post(
      `${this.baseUrl}/users/update/password/${userId}`,
      password
    );
  }
}
