import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  RoleClaimsRequest,
  RolePermissionsByType,
} from '@smec-monorepo/modules-roles-data-acess';
import { RolesFeatureService } from '@smec-monorepo/modules-roles-data-acess';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-manage-permissions',
  template: `
    <ng-container *ngIf="data">
      <mat-card class="table-card">
        <form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
          <table mat-table fixedLayout [dataSource]="data.roleClaims">
            <ng-container matColumnDef="description">
              <th mat-header-cell *matHeaderCellDef>Descripción</th>
              <td mat-cell *matCellDef="let element">
                {{ element.description }}
              </td>
            </ng-container>

            <ng-container matColumnDef="selected">
              <th mat-header-cell *matHeaderCellDef>
                <button
                  mat-icon-button
                  type="submit"
                  [disabled]="disableForm || formGroup.invalid"
                >
                  <mat-icon>save</mat-icon>
                </button>
              </th>
              <td mat-cell *matCellDef="let element">
                <mat-checkbox
                  [name]="element.value"
                  [formControlName]="element.value"
                  color="accent"
                >
                </mat-checkbox>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
        </form>
      </mat-card>
    </ng-container>
  `,
  styles: [
    `
      td.mat-column-actions {
        width: 120px;
      }

      td.mat-column-selected {
        padding-left: 10px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagePermissionsComponent /*implements OnInit*/ {
  _data!: RolePermissionsByType;
  get data(): RolePermissionsByType {
    return this._data;
  }
  @Input() set data(value: RolePermissionsByType) {
    this._data = value;
    this.getData();
  }

  @Output() update = new EventEmitter<RoleClaimsRequest[]>();

  roleClaims!: RoleClaimsRequest[];

  formGroup!: FormGroup;
  disableForm = true;

  displayedColumns: string[] = ['description', 'selected'];

  hasPermission = this.roleService.checkPermissions;

  constructor(private roleService: RolesFeatureService) {}

  // ngOnInit(): void {}

  onSubmit() {
    if (!this.formGroup.valid) return;
    this.roleClaims = this.roleService.updateRoleClaimsValues(
      this.roleClaims,
      this.formGroup
    );
    this.update.emit(this.roleClaims);
  }

  private getData() {
    this.disableForm = true;
    this.roleClaims = this.data.roleClaims;
    this.formGroup = this.roleService.createGroup(
      this.roleClaims,
      this.hasPermission.canEditPermissions
    );
    this.roleService.formNames = Object.keys(this.formGroup.controls);

    if (this.formGroup) {
      this.roleService.disableForm(this.formGroup).subscribe((value) => {
        this.disableForm = value;
      });
    }
  }
}
