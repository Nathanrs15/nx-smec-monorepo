import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@smec-monorepo/modules-users-data-access';
import { UserService } from '@smec-monorepo/modules-users-data-access';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-user-list',
  template: `
    <div class="responsive-table">
      <table mat-table fixedLayout [dataSource]="dataSource">
        <!-- Username -->
        <ng-container matColumnDef="userName">
          <th mat-header-cell *matHeaderCellDef>Usuario</th>
          <td
            mat-cell
            *matCellDef="let element"
            class="m-card-title"
            test
            data-label="Usuario"
          >
            {{ element.userName }}
          </td>
        </ng-container>

        <!-- email -->
        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef>Correo</th>
          <td mat-cell *matCellDef="let element" class="m-card-sub-title">
            {{ element.email }}
          </td>
        </ng-container>

        <!-- roles -->
        <ng-container matColumnDef="roles">
          <th mat-header-cell *matHeaderCellDef>Roles</th>
          <td mat-cell *matCellDef="let element" class="has_label_on_mobile">
            {{ element.roles.join(', ') }}
          </td>
        </ng-container>

        <!-- actions -->
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>
            <!-- <button
              mat-icon-button
              routerLink="./add-user"
              [disabled]="!hasPermission.canCreateUser"
            >
              <mat-icon>add_circle</mat-icon>
            </button> -->
          </th>
          <td mat-cell *matCellDef="let element">
            <button
              mat-icon-button
              [matMenuTriggerFor]="menu"
              [matMenuTriggerData]="{ selection: element }"
            >
              <mat-icon>more_vert</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr
          mat-header-row
          *matHeaderRowDef="displayedColumns; sticky: true"
        ></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>

    <mat-menu #menu="matMenu">
      <ng-template matMenuContent let-selection="selection">
        <button
          mat-menu-item
          [routerLink]="['user-settings', selection.id]"
          routerLinkActive="active"
          [disabled]="!hasPermission.canEditUserRoles"
        >
          <mat-icon>settings</mat-icon>
          <span>Administrar roles</span>
        </button>
      </ng-template>
    </mat-menu>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  @Input() users!: User[];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);

  // get users(): User[] {
  //   return this._users;
  // }
  // @Input() set users(value: User[]) {
  //   this._users = value;
  // }

  displayedColumns: string[] = ['userName', 'email', 'roles', 'actions'];

  hasPermission = this.userService.checkPermissions;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.dataSource.data = this.users;
  }
}
