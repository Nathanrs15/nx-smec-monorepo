import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfo } from '../info.model';
import { SnackbarService } from '@smec-monorepo/shared/utils';
import { AuthenticationService } from '@smec-monorepo/shared/data-access';

import { environment } from '@smec-monorepo/shared/environments';

@Injectable()
export class ProfileService {
  private baseUrl = environment.apiUrl;

  private userIdSoruce = new BehaviorSubject<string>('');
  userId$ = this.userIdSoruce.asObservable();

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService,
    private authService: AuthenticationService
  ) {}

  getUserById(id: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(this.baseUrl + '/users/' + id);
  }

  updatePassord(userId: string, password: any) {
    return this.http.post(
      `${this.baseUrl}/users/update/password/${userId}`,
      password
    );
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
