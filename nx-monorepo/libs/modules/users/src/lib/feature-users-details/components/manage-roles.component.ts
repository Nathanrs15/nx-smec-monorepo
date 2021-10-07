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
    <div class="w-full max-w-3xl">
      <form novalidate [formGroup]="checkForm" (ngSubmit)="onSubmit()">
        <!-- Section -->
        <div class="w-full text-xl">Administrar roles de usuario</div>
        <!-- <div class="w-full mt-8 font-medium">:</div> -->
        <div class="grid grid-cols-1 gap-4 w-full mt-4">
          <div class="grid grid-cols-1 gap-4 w-full mt-4">
            <ng-container *ngFor="let item of userRoles.userRoles">
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
            </ng-container>
          </div>
        </div>
      </form>
    </div>
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
