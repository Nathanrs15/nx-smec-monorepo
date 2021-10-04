import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormValidationService,
  GridBreakpointService,
} from '@smec-monorepo/shared';
import { Role, UserService } from '../../data-access';

@Component({
  template: `
    <div
      class="sm:absolute sm:inset-0 flex flex-col flex-auto min-w-0 sm:overflow-hidden bg-card dark:bg-transparent"
    >
      <!-- Header -->
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between p-6 sm:py-12 md:px-8 border-b bg-card dark:bg-transparent"
      >
        <!-- Title -->
        <div>
          <div class="text-4xl font-extrabold tracking-tight leading-none">
            Usuarios
          </div>
          <div class="flex items-center mt-0.5 font-medium text-secondary">
            <!-- Breadcrumbs -->
            <div class="flex items-center space-x-2">
              <a
                class="text-primary cursor-pointer"
                [routerLink]="['/app/users']"
                >Usuarios
              </a>
              <div class="">/</div>
              <div>Añadir usuario</div>
            </div>
          </div>
        </div>
      </div>
      <!-- Main -->
      <div class="flex flex-auto overflow-hidden">
        <div class="grid">
          <mat-card>
            <form
              [formGroup]="formGroup"
              #form="ngForm"
              (ngSubmit)="onSubmit()"
            >
              <div fxLayout="column" fxLayoutAlign="space-around start">
                <mat-form-field appearance="outline" color="accent">
                  <mat-label>Nombre de usuario</mat-label>
                  <input matInput formControlName="username" name="username" />
                  <button *ngIf="username?.dirty" mat-icon-button matSuffix>
                    <mat-icon>close</mat-icon>
                  </button>
                </mat-form-field>

                <mat-form-field appearance="outline" color="accent">
                  <mat-label>Correo electrónico</mat-label>
                  <input matInput formControlName="email" name="email" />
                  <button *ngIf="email?.dirty" mat-icon-button matSuffix>
                    <mat-icon>close</mat-icon>
                  </button>
                </mat-form-field>

                <div
                  [fxLayout]="(breakpoint$ | async) ? 'column' : 'row'"
                  fxFill
                >
                  <mat-form-field
                    appearance="outline"
                    style="margin-right: 1em;"
                    color="accent"
                  >
                    <mat-label>Contraseña</mat-label>
                    <input
                      matInput
                      formControlName="newPassword"
                      name="newPassword"
                      [type]="service.hideNewPassword ? 'password' : 'text'"
                    />
                    <button
                      mat-icon-button
                      type="button"
                      matSuffix
                      (click)="
                        service.hideNewPassword = !service.hideNewPassword
                      "
                      [attr.aria-label]="'Hide password'"
                      [attr.aria-pressed]="service.hideNewPassword"
                    >
                      <mat-icon>{{
                        service.hideNewPassword
                          ? 'visibility_off'
                          : 'visibility'
                      }}</mat-icon>
                    </button>
                    <mat-error *ngIf="newPassword?.invalid">
                      {{
                        service.getNewPassswordErrorMessage(newPassword)
                      }}</mat-error
                    >
                  </mat-form-field>

                  <mat-form-field appearance="outline" color="accent">
                    <mat-label>Confirmar contraseña</mat-label>
                    <input
                      matInput
                      formControlName="confirmPassword"
                      name="confirmPassword"
                      [type]="service.hideConfirmPassword ? 'password' : 'text'"
                    />

                    <button
                      mat-icon-button
                      type="button"
                      matSuffix
                      (click)="
                        service.hideConfirmPassword =
                          !service.hideConfirmPassword
                      "
                      [attr.aria-label]="'Hide password'"
                      [attr.aria-pressed]="service.hideConfirmPassword"
                    >
                      <mat-icon>{{
                        service.hideConfirmPassword
                          ? 'visibility_off'
                          : 'visibility'
                      }}</mat-icon>
                    </button>
                    <mat-error *ngIf="confirmPassword?.invalid">
                      {{
                        service.getCofirmPassswordErrorMessage(confirmPassword)
                      }}</mat-error
                    >
                  </mat-form-field>
                </div>

                <div fxFill>
                  <mat-form-field appearance="outline" color="accent">
                    <mat-label>Añadir roles al usuario</mat-label>
                    <mat-select multiple formControlName="roles" name="roles">
                      <mat-option
                        *ngFor="let role of roles$ | async; trackBy: trackByFn"
                        [value]="role"
                        >{{ role.name }}</mat-option
                      >
                    </mat-select>
                  </mat-form-field>
                </div>

                <div class="form-submit-section" fxLayout="row">
                  <button
                    mat-button
                    class="submit-section-btn"
                    type="submit"
                    color="primary"
                    [disabled]="formGroup.invalid"
                  >
                    Guardar
                  </button>

                  <button mat-button type="button" (click)="navigateTo()">
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          </mat-card>
        </div>
      </div>
    </div>
  `,
})
export class UserAddPage /*extends FormCanDeactivate */ implements OnInit {
  displayedColumns: string[] = ['roleName', 'selected'];

  roles$: Observable<Role[]> = this.userService.getAllRoles();

  formGroup!: FormGroup;
  isAddMode = true;
  formInitialValue!: any;

  breakpoint$ = this.gridService.mobileBreakpoint$;

  @ViewChild('form') form!: NgForm;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public service: FormValidationService,
    private gridService: GridBreakpointService
  ) {
    // super();
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', Validators.required],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            this.service.patternValidator(this.service.controlHasNumber, {
              hasNumber: true,
            }),
            this.service.patternValidator(this.service.controlHasCapitalCase, {
              hasCapitalCase: true,
            }),
            this.service.patternValidator(this.service.controlHasSmallCase, {
              hasSmallCase: true,
            }),
            this.service.patternValidator(
              this.service.controlHasSpecialCharacters,
              {
                hasSpecialCharacters: true,
              }
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
        roles: ['', Validators.required],
      },
      {
        validator: this.service.ConfirmedValidator(
          'newPassword',
          'confirmPassword'
        ),
      }
    );
  }

  get username(): AbstractControl | null {
    return this.formGroup.get('username');
  }
  get email(): AbstractControl | null {
    return this.formGroup.get('email');
  }
  get newPassword(): AbstractControl | null {
    return this.formGroup.get('newPassword');
  }
  get confirmPassword(): AbstractControl | null {
    return this.formGroup.get('confirmPassword');
  }
  get roles(): AbstractControl | null {
    return this.formGroup.get('roles');
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.userService.createUser(this.formGroup.value).subscribe(() => {
      this.userService.showCreatedUserSnackBar(this.username?.value);
      this.navigateTo();
    });
  }

  navigateTo() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  trackByFn(index: number, item: any) {
    return index;
  }
}
