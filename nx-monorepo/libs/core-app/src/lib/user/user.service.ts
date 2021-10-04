import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User, IdentityUser } from './user.types';

import { environment } from '@smec-monorepo/shared';
import jwt_decode from 'jwt-decode';
import { AuthenticationService } from '../auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.baseUrl;

  private token: string = jwt_decode(
    this.authService.getAuth()?.token as string
  );
  private loggedUserId = this.token.sub.toString();

  private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

  /**
   * Constructor
   */
  constructor(
    private _httpClient: HttpClient,
    private authService: AuthenticationService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for user
   *
   * @param value
   */
  set user(value: User) {
    // Store the value
    this._user.next(value);
  }

  get user$(): Observable<User> {
    return this._user.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get the current logged in user data
   */
  get(): Observable<User> {
    return this._httpClient
      .get<IdentityUser>(this.baseUrl + '/users/' + this.loggedUserId)
      .pipe(
        map((user: IdentityUser) => {
          return {
            id: user.id,
            name: user.userName,
            email: user.email,
            avatar: 'assets/images/avatars/brian-hughes.jpg',
            status: 'online',
          };
        }),
        tap((user) => {
          this._user.next(user);
        })
      );
  }

  /**
   * Update the user
   *
   * @param user
   */
  update(user: User): Observable<any> {
    return this._httpClient.patch<User>('api/common/user', { user }).pipe(
      map((response) => {
        this._user.next(response);
      })
    );
  }
}
