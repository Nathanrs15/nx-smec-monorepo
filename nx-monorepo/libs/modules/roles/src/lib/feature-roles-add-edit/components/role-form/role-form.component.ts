import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  Input,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '@smec-monorepo/shared';
import { RolesFeatureService } from '../../../data-access';
@Component({
  selector: 'role-form',
  template: `
    <form
      class="flex flex-col mt-4 px-8 pt-10 bg-card shadow rounded overflow-hidden"
      [formGroup]="formGroup"
      #form="ngForm"
      (ngSubmit)="onSubmit()"
    >
      <p class="text-lg font-medium">
        {{ isAddMode ? 'Añadir' : 'Editar' }} rol
      </p>
      <p class="text-secondary mb-6"></p>
      <div class="flex flex-col gt-xs:flex-row">
        <mat-form-field class="flex-auto gt-xs:pr-3">
          <input
            matInput
            [placeholder]="'Nombre del rol'"
            placeholder="Role name"
            name="name"
            formControlName="name"
            required
          />

          <mat-icon
            class="icon-size-5"
            matPrefix
            [svgIcon]="'heroicons_solid:user-group'"
          ></mat-icon>

          <button *ngIf="name?.dirty" mat-icon-button matSuffix>
            <mat-icon>{{ isAddMode ? 'close' : 'restart_alt' }}</mat-icon>
          </button>
        </mat-form-field>
      </div>

      <div
        class="flex items-center justify-end border-t -mx-8 mt-8 px-8 py-5 bg-gray-50 dark:bg-gray-700"
      >
        <button mat-button type="button" (click)="navigateToRoles()">
          Cancelar
        </button>
        <button
          type="submit"
          class="px-6 ml-3"
          mat-flat-button
          [color]="'primary'"
          [disabled]="formGroup.invalid"
        >
          Guardar
        </button>
      </div>
    </form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleFormComponent implements OnInit {
  formGroup!: FormGroup;
  formInitialValue!: any;

  returnUrl: string;

  @ViewChild('form') form!: NgForm;

  @Input() id!: string;
  @Input() isAddMode: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private roleService: RolesFeatureService,
    private snackbarService: SnackbarService
  ) {
    // super();
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: '',
      name: ['', Validators.required],
      concurrencyStamp: '',
      normalizedName: '',
    });

    if (!this.isAddMode) {
      this.returnUrl = '../../';
      this.roleService.getRoleById(this.id).subscribe((role) => {
        this.formGroup.patchValue(role);
        this.formInitialValue = this.formGroup.value;
      });
    } else {
      this.returnUrl = '../';
    }
  }

  get name(): AbstractControl | null {
    return this.formGroup.get('name');
  }

  navigateToRoles() {
    this.router.navigate([this.returnUrl], {
      relativeTo: this.route,
    });
  }

  navigateToRolePermissions(id: string) {
    this.router.navigate(['../manage-permissions', id], {
      relativeTo: this.route,
    });
  }

  onSubmit() {
    if (this.formGroup.invalid) return;

    if (this.isAddMode) {
      this.roleService.createRole(this.formGroup.value).subscribe((result) => {
        this.snackbarService.openSnackBar(
          `Rol ${this.name?.value} añadido`,
          'Aceptar'
        );

        this.navigateToRolePermissions(result.id);
      });
    } else {
      this.roleService
        .updateRole(this.id, this.formGroup.value)
        .subscribe(() => {
          this.snackbarService.openSnackBar(
            `Rol ${this.name?.value} actualizado`,
            'Aceptar'
          );
          this.navigateToRoles();
        });
    }
  }
}
