import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { GridBreakpointService } from '@smec-monorepo/shared/utils';
import { User } from '@smec-monorepo/shared/models';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-user-responsive-table',
  template: `
    <ng-container *ngIf="breakpoint$ | async; else card">
      <mat-form-field appearance="standard" class="mobile-form-field">
        <mat-label>Buscar</mat-label>
        <input matInput placeholder="Ej. Administrador" #input />
      </mat-form-field>
      <app-user-list [users]="users"></app-user-list>

      <div class="fab-container">
        <button
          class="fab-toggler"
          mat-fab
          color="accent"
          aria-label="Añadir usuario nuevo"
          routerLink="./add-user"
        >
          <mat-icon>person_add</mat-icon>
        </button>
      </div>
    </ng-container>

    <ng-template #card>
      <!-- filter card -->
      <app-user-card-options></app-user-card-options>
      <!-- card user table -->
      <mat-card class="table-card">
        <app-user-list [users]="users"></app-user-list>
      </mat-card>
    </ng-template>
  `,
  styles: [
    `
      .mobile-form-field {
        font-size: 14px;
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserResponsiveTableComponent {
  breakpoint$ = this.gridService.mobileBreakpoint$;

  _users!: User[];

  get users(): User[] {
    return this._users;
  }
  @Input() set users(value: User[]) {
    this._users = value;
  }

  constructor(private gridService: GridBreakpointService) {}

  // ngOnInit(): void {}
}
