import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UpdateUserRoles, UserRoles, UserService } from '../../data-access';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-manage-roles',
  template: `
    <form
      class="flex flex-col mt-4 px-8 pt-10 bg-card shadow rounded overflow-hidden"
      novalidate
      [formGroup]="checkForm"
      (ngSubmit)="onSubmit()"
    >
      <div class="flex flex-col gt-xs:flex-row gt-xs:items-start">
        <div class="gt-xs:max-w-80 gt-xs:pr-12">
          <p class="text-lg font-medium">Roles</p>
          <p class="text-secondary mb-6">Asignar roles de usuario.</p>
        </div>
        <div class="flex-auto min-w-64">
          <div class="flex flex-col">
            <div class="flex flex-col">
              <ng-container *ngFor="let item of userRoles.userRoles">
                <div class="grid grid-cols-1 gap-4 w-full mt-4">
                  <div class="flex items-center justify-between">
                    <div
                      class="flex-auto leading-6 cursor-pointer"
                      (click)="rol.toggle()"
                    >
                      {{ item.roleName }}
                    </div>
                    <mat-slide-toggle
                      class="ml-2"
                      [color]="'primary'"
                      [name]="item.roleName"
                      [formControlName]="item.roleName"
                      #rol
                    >
                    </mat-slide-toggle>
                  </div>
                </div>
              </ng-container>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex items-center justify-end border-t -mx-8 mt-8 px-8 py-5 bg-gray-50 dark:bg-gray-700"
      >
        <button
          type="submit"
          class="px-6 ml-3"
          mat-flat-button
          [color]="'primary'"
          [disabled]="disableform"
        >
          Guardar
        </button>
      </div>
    </form>
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
