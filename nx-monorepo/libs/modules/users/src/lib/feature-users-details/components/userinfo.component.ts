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
      <div class="w-full max-w-3xl">
        <form>
          <!-- Section -->
          <div class="w-full">
            <div class="text-xl">Información Básica</div>
            <div class="text-secondary">
              La siguiente información no es editable.
            </div>
          </div>

          <div class="grid sm:grid-cols-4 gap-6 w-full mt-8">
            <!-- userName -->
            <div class="sm:col-span-4">
              <mat-form-field class="w-full">
                <mat-label>Nombre de usuario</mat-label>
                <input matInput [value]="data.user.userName" disabled />
                <mat-icon
                  class="icon-size-5"
                  matPrefix
                  [svgIcon]="'heroicons_solid:user'"
                ></mat-icon>
              </mat-form-field>
            </div>

            <!-- email -->
            <div class="sm:col-span-4">
              <mat-form-field class="w-full">
                <mat-label>Correo electrónico</mat-label>
                <input matInput [value]="data.user.email" disabled />
                <mat-icon
                  class="icon-size-5"
                  matPrefix
                  [svgIcon]="'heroicons_solid:mail'"
                ></mat-icon>
              </mat-form-field>
            </div>
          </div>
        </form>
      </div>
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
