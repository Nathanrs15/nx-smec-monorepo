import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ConfirmDialogService } from '@smec-monorepo/shared/utils';
import { Role } from '@smec-monorepo/shared/models';
import { RolesFeatureService } from '@smec-monorepo/roles/data-access';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-roles-list',
  template: `
    <h2 class="view-title">Administración de roles</h2>
    <mat-card class="table-card">
      <table mat-table fixedLayout [dataSource]="roles">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Rol</th>
          <td mat-cell *matCellDef="let element">{{ element.name }}</td>
        </ng-container>

        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>Identificador</th>
          <td mat-cell *matCellDef="let element">{{ element.id }}</td>
        </ng-container>

        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef>
            <button
              mat-icon-button
              [routerLink]="['add-role']"
              [disabled]="!hasPermission.canCreateRole"
            >
              <mat-icon>add_circle</mat-icon>
            </button>
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

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </mat-card>

    <mat-menu #menu="matMenu">
      <ng-template matMenuContent let-selection="selection">
        <button
          mat-menu-item
          [routerLink]="['edit-role', selection.id]"
          [disabled]="!hasPermission.canEditRole"
        >
          <mat-icon>edit</mat-icon>
          <span>Editar</span>
        </button>
        <button
          mat-menu-item
          [disabled]="!hasPermission.canDeleteRole"
          (click)="canDelete(selection.id)"
        >
          <mat-icon>delete</mat-icon>
          <span>Eliminar</span>
        </button>
        <button
          mat-menu-item
          [routerLink]="['manage-permissions', selection.id]"
          routerLinkActive="active"
          [disabled]="!hasPermission.canViewPermissions"
        >
          <mat-icon>rule</mat-icon>
          <span>Administrar permisos</span>
        </button>
      </ng-template>
    </mat-menu>
  `,
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolesListComponent {
  @Input() roles: Role[] = [];
  @Output() update = new EventEmitter();

  displayedColumns: string[] = ['name', 'id', 'action'];

  hasPermission = this.roleService.checkPermissions;

  constructor(
    private roleService: RolesFeatureService,
    private dialogService: ConfirmDialogService
  ) {}

  // ngOnInit(): void {}

  canDelete(id: string) {
    this.dialogService.open(this.roleService.dialogOptions);

    return this.dialogService
      .confirmed()
      .pipe(switchMap((confirmed) => (confirmed ? this.deleteRole(id) : EMPTY)))
      .subscribe(() => {
        this.roleService.showDeletedRoleSnackBar();
        this.update.emit();
      });
  }

  deleteRole(id: string) {
    return this.roleService.deleteRole(id);
  }
}
