import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  CheckPermissionService,
  SnackbarService,
  UiStateService,
  UIStatus,
  environment,
} from '@smec-monorepo/shared';

import {
  Role,
  UpdateUserRoles,
  User,
  UserCreate,
  UserInfo,
  UserRoles,
} from './user.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthenticationService } from '@smec-monorepo/core-app';

import jwt_decode from 'jwt-decode';

@Injectable()
export class UserService {
  private baseUrl = environment.baseUrl;

  private token: string = jwt_decode(
    this.authService.getAuth()?.token as string
  );
  private loggedUserId = this.token.sub.toString();

  formNames: string[] = [];

  UIState$: Observable<UIStatus> = this.uistateService.UIState$;

  checkPermissions = {
    canCreateUser: this.checkPermission.hasPermission('Users.Create'),
    canEditUserRoles: this.checkPermission.hasPermission('Roles.Edit'),
  };

  constructor(
    private http: HttpClient,
    public authService: AuthenticationService,
    private checkPermission: CheckPermissionService,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private uistateService: UiStateService
  ) {}

  getUserById(id: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(this.baseUrl + '/users/' + id);
  }

  getAllUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.baseUrl + '/users/' + this.loggedUserId + '/all')
      .pipe(
        // delay(2000),
        // map((data) => []),
        tap((data) => this.uistateService.updateUIState(data))
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

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/roles`);
  }

  getUserRoles(userId: string): Observable<UserRoles> {
    return this.http.get<UserRoles>(this.baseUrl + '/userroles/' + userId);
  }

  updateUserRoles(userId: string, data: UpdateUserRoles) {
    return this.http.post<UserRoles>(
      this.baseUrl + '/userroles/update/' + userId,
      data
    );
  }

  showUpdatedUserRolesSnackBar() {
    this.snackbarService.openSnackBar(`Roles actualizados`, 'Aceptar');
  }

  private isEquivalent(a: any, b: any) {
    // Create arrays of property names
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
      return false;
    }

    for (let i = 0; i < aProps.length; i++) {
      const propName = aProps[i];

      // If values of same property are not equal,
      // objects are not equivalent
      if (a[propName] !== b[propName]) {
        return false;
      }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
  }

  disableForm(form: FormGroup): Observable<boolean> {
    const oldValue = form.value;

    return form.valueChanges.pipe(
      map((value) => {
        return form.dirty && this.isEquivalent(oldValue, value) ? true : false;
      })
    );
  }

  createGroup(data: UserRoles) {
    const group = this.fb.group({});
    data.userRoles.forEach((control) =>
      group.addControl(control.roleName, this.fb.control(control.selected))
    );
    return group;
  }

  showCreatedUserSnackBar(value: string) {
    this.snackbarService.openSnackBar(`Usuario ${value} creado`, 'Aceptar');
  }

  showResetedPasswordSnackBar() {
    this.snackbarService.openSnackBar(`Contraseña actualizada`, 'Aceptar');
  }
}
