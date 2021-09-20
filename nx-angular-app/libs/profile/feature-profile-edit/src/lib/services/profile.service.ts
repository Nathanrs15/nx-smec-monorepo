import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfo } from '@smec-monorepo/shared/models';
import { SnackbarService } from '@smec-monorepo/shared/utils';
import { AuthenticationService } from '@smec-monorepo/shared/data-access';

import { UsersApiService } from '@smec-monorepo/shared/data-access';

@Injectable()
export class ProfileService {
  private userIdSoruce = new BehaviorSubject<string>('');
  userId$ = this.userIdSoruce.asObservable();

  constructor(
    private snackbarService: SnackbarService,
    private authService: AuthenticationService,
    private usersApi: UsersApiService
  ) {}

  getUserById(id: string): Observable<UserInfo> {
    return this.usersApi.getUserById(id);
  }

  updatePassord(userId: string, password: any) {
    return this.usersApi.updatePassord(userId, password);
  }

  setUserId(id: string) {
    this.userIdSoruce.next(id);
  }

  showUpdatedPasswordSnackBar() {
    this.snackbarService.openSnackBar(`Contraseña actualizada`, 'Aceptar');
  }

  precautionLogOut() {
    this.authService.logout();
  }
}
