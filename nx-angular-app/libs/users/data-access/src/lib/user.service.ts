import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  CheckPermissionService,
  SnackbarService,
  UiStateService,
  UIStatus,
} from '@smec-monorepo/shared/utils';
import {
  Role,
  UpdateUserRoles,
  User,
  UserCreate,
  UserInfo,
  UserRoles,
} from '@smec-monorepo/shared/models';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  RolesApiService,
  UserRolesApiService,
  UsersApiService,
} from '@smec-monorepo/shared/data-access';

@Injectable()
export class UserService {
  formNames: string[] = [];

  UIState$: Observable<UIStatus> = this.uistateService.UIState$;

  checkPermissions = {
    canCreateUser: this.checkPermission.hasPermission('Users.Create'),
    canEditUserRoles: this.checkPermission.hasPermission('Roles.Edit'),
  };

  constructor(
    private checkPermission: CheckPermissionService,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private usersApi: UsersApiService,
    private userRolesApi: UserRolesApiService,
    private rolesApi: RolesApiService,
    private uistateService: UiStateService
  ) {}

  getUserById(id: string): Observable<UserInfo> {
    return this.usersApi.getUserById(id);
  }

  getAllUsers(): Observable<User[]> {
    return this.usersApi.getAllUsers().pipe(
      // delay(2000),
      // map((data) => []),
      tap((data) => this.uistateService.updateUIState(data))
    );
  }

  createUser(user: UserCreate) {
    return this.usersApi.createUser(user);
  }

  deleteUserById(userId: string) {
    return this.usersApi.deleteUserById(userId);
  }

  getAllRoles(): Observable<Role[]> {
    return this.rolesApi.getAllRoles();
  }

  resettUserPassword(userId: string, password: any) {
    return this.usersApi.resettUserPassword(userId, password);
  }

  getUserRoles(userId: string): Observable<UserRoles> {
    return this.userRolesApi.getUserRoles(userId);
  }

  updateUserRoles(userId: string, data: UpdateUserRoles) {
    return this.userRolesApi.updateUserRoles(userId, data);
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
