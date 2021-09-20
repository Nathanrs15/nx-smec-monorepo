import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UpdateUserRoles, UserRoles } from '@smec-monorepo/shared/models';
import { UserService } from '@smec-monorepo/users/data-access';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-manage-roles',
  template: `
    <h2 class="view-title">Roles de usuario</h2>

    <mat-card class="table-card">
      <form novalidate [formGroup]="checkForm" (ngSubmit)="onSubmit()">
        <table mat-table fixedLayout [dataSource]="userRoles.userRoles">
          <ng-container matColumnDef="roleName">
            <th mat-header-cell *matHeaderCellDef>Rol</th>
            <td mat-cell *matCellDef="let element">{{ element.roleName }}</td>
          </ng-container>

          <ng-container matColumnDef="selected">
            <th mat-header-cell *matHeaderCellDef>
              <button mat-icon-button type="submit" [disabled]="disableform">
                <mat-icon>save</mat-icon>
              </button>
            </th>
            <td mat-cell *matCellDef="let element">
              <mat-checkbox
                [name]="element.roleName"
                [formControlName]="element.roleName"
              >
              </mat-checkbox>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </form>
    </mat-card>
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
export class ManageRolesComponent implements OnInit {
  _userRoles!: UserRoles;
  get userRoles(): UserRoles {
    return this._userRoles;
  }
  @Input() set userRoles(data: UserRoles) {
    this._userRoles = data;
  }

  @Output() updateRoles = new EventEmitter<UpdateUserRoles>();

  displayedColumns: string[] = ['roleName', 'selected'];

  checkForm!: FormGroup;

  disableform = true;

  constructor(private userService: UserService) {}

  setData() {
    console.log('update ?');

    this.checkForm = this.userService.createGroup(this.userRoles);
    this.userService.formNames = Object.keys(this.checkForm.controls);

    this.userService.disableForm(this.checkForm).subscribe((value) => {
      this.disableform = value;
    });
  }

  ngOnInit(): void {
    this.setData();
  }

  onSubmit() {
    if (this.checkForm.invalid) return;
    const data = {
      names: this.userService.formNames,
      formValues: this.checkForm.value,
      userRoles: this.userRoles.userRoles,
    };

    this.updateRoles.emit(data);
  }
}
