import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormCanDeactivate } from '@smec-monorepo/shared/ui';
import { SnackbarService } from '@smec-monorepo/shared/utils';
import { RolesFeatureService } from '@smec-monorepo/roles/data-access';

@Component({
  template: `
    <h2 class="view-title">{{ isAddMode ? 'Añadir nuevo' : 'Editar' }} rol</h2>
    <mat-card>
      <mat-card-content>
        <form
          class="custom-form"
          [formGroup]="formGroup"
          #form="ngForm"
          (ngSubmit)="onSubmit()"
        >
          <div fxLayout="column" fxLayoutAlign="space-around start" fxFill>
            <mat-form-field appearance="outline" color="accent">
              <mat-label>Nombre del rol</mat-label>
              <input
                matInput
                placeholder="Role name"
                name="name"
                formControlName="name"
                required
              />

              <button
                *ngIf="name?.dirty"
                mat-icon-button
                matSuffix
                (click)="restartForm('name')"
              >
                <mat-icon>{{ isAddMode ? 'close' : 'restart_alt' }}</mat-icon>
              </button>
            </mat-form-field>

            <div class="form-submit-section" fxLayout="row">
              <button
                mat-button
                type="submit"
                color="primary"
                [disabled]="formGroup.invalid"
              >
                Guardar
              </button>

              <button mat-button type="button" (click)="navigateToRoles()">
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [],
})
export class RoleAddEditPage extends FormCanDeactivate implements OnInit {
  id!: string;

  formGroup!: FormGroup;
  isAddMode!: boolean;
  formInitialValue!: any;

  @ViewChild('form') form!: NgForm;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private roleService: RolesFeatureService,
    private snackbarService: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.formGroup = this.fb.group({
      id: '',
      name: ['', Validators.required],
      concurrencyStamp: '',
      normalizedName: '',
    });

    if (!this.isAddMode) {
      this.roleService.getRoleById(this.id).subscribe((role) => {
        this.formGroup.patchValue(role);
        this.formInitialValue = this.formGroup.value;
      });
    }
  }

  get name(): AbstractControl | null {
    return this.formGroup.get('name');
  }

  navigateToRoles() {
    this.router.navigate([this.returnUrl()], {
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
