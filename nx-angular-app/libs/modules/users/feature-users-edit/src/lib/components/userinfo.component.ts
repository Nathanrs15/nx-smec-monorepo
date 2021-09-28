import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { GridBreakpointService } from '@smec-monorepo/shared/utils';
import { UserInfo } from '@smec-monorepo/modules-users-data-access';
import { Observable } from 'rxjs';
import { UserService } from '@smec-monorepo/modules-users-data-access';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-userinfo',
  template: `
    <ng-container *ngIf="userInfo$ | async as data">
      <h2 class="view-title">Información de usuario</h2>

      <mat-card>
        <mat-card-content>
          <form class="custom-form">
            <div fxLayout="column" fxLayoutAlign="space-around start">
              <div [fxLayout]="(breakpoint$ | async) ? 'column' : 'row'" fxFill>
                <mat-form-field
                  appearance="outline"
                  color="accent"
                  style="margin-right: 1em;"
                >
                  <mat-label>Nombre de usuario</mat-label>
                  <input matInput [value]="data.user.userName" disabled />
                </mat-form-field>

                <mat-form-field appearance="outline" color="accent">
                  <mat-label>Correo electrónico</mat-label>
                  <input matInput [value]="data.user.email" disabled />
                </mat-form-field>
              </div>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserinfoComponent implements OnInit {
  @Input() userId!: string;

  userInfo$!: Observable<UserInfo>;
  breakpoint$ = this.gridService.mobileBreakpoint$;

  constructor(
    private userSevice: UserService,
    private gridService: GridBreakpointService
  ) {}

  ngOnInit(): void {
    console.log('UserinfoComponent ', this.userId);

    this.userInfo$ = this.userSevice.getUserById(this.userId);
  }
}
