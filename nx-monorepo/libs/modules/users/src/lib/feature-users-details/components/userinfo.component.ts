import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { UserInfo, UserService } from '../../data-access';
import { GridBreakpointService } from '@smec-monorepo/shared';
import { Observable } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-userinfo',
  template: `
    <ng-container *ngIf="userInfo$ | async as data">
      <form
        class="flex flex-col mt-4 px-8 pt-10 bg-card shadow rounded overflow-hidden"
      >
        <p class="text-lg font-medium">Información de usuario</p>
        <p class="text-secondary mb-6">
          La siguiente información no es editable.
        </p>
        <div class="flex flex-col gt-xs:flex-row">
          <mat-form-field class="flex-auto gt-xs:pr-3">
            <input
              matInput
              [placeholder]="'Nombre de usuario'"
              [value]="data.user.userName"
              disabled
            />
            <mat-icon
              class="icon-size-5"
              matPrefix
              [svgIcon]="'heroicons_solid:user'"
            ></mat-icon>
          </mat-form-field>

          <mat-form-field class="flex-auto gt-xs:pl-3">
            <input
              matInput
              [placeholder]="'Correo electrónico'"
              [value]="data.user.email"
              disabled
            />
            <mat-icon
              class="icon-size-5"
              matPrefix
              [svgIcon]="'heroicons_solid:mail'"
            ></mat-icon>
          </mat-form-field>
        </div>
      </form>
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
