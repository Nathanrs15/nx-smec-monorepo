/* eslint-disable @typescript-eslint/member-ordering */
import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    NgForm,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidationService, GridBreakpointService } from '@shared/utils';
import { Role, UserService } from '../../data-access';

@Component({
    selector: 'user-form',
    template: `
        <form [formGroup]="formGroup" #form="ngForm" (ngSubmit)="onSubmit()">
            <!-- Section Información Básica -->
            <div class="w-full">
                <div class="text-xl">Información Básica</div>
                <div class="text-secondary">
                    Asigna un nombre de usuario y email como credenciales.
                </div>
            </div>
            <div class="grid sm:grid-cols-4 gap-6 w-full mt-8">
                <!-- userName -->
                <div class="sm:col-span-4">
                    <mat-form-field class="w-full">
                        <mat-label>Nombre de usuario</mat-label>
                        <input
                            matInput
                            formControlName="username"
                            name="username"
                        />
                        <mat-icon
                            class="icon-size-5"
                            matPrefix
                            [svgIcon]="'heroicons_solid:user'"
                        ></mat-icon>
                    </mat-form-field>
                </div>

                <!-- email -->
                <div class="sm:col-span-4">
                    <mat-form-field class="w-full">
                        <mat-label>Correo electrónico</mat-label>
                        <input matInput formControlName="email" name="email" />
                        <mat-icon
                            class="icon-size-5"
                            matPrefix
                            [svgIcon]="'heroicons_solid:mail'"
                        ></mat-icon>
                    </mat-form-field>
                </div>
            </div>
            <!-- Divider -->
            <div class="my-10 border-t"></div>
            <!-- Section  Establecer contraseña-->
            <div class="w-full">
                <div class="text-xl">Establecer contraseña</div>
                <div class="text-secondary">
                    Utiliza una contraseña suficientemente segura.
                </div>
            </div>
            <div class="grid sm:grid-cols-4 gap-6 w-full mt-8">
                <!-- contraseña -->
                <div class="sm:col-span-4">
                    <mat-form-field class="w-full">
                        <mat-label>Contraseña</mat-label>
                        <input
                            matInput
                            formControlName="newPassword"
                            name="newPassword"
                            [type]="
                                service.hideNewPassword ? 'password' : 'text'
                            "
                        />
                        <mat-icon
                            class="icon-size-5"
                            matPrefix
                            [svgIcon]="'heroicons_solid:key'"
                        ></mat-icon>
                        <button
                            mat-icon-button
                            type="button"
                            matSuffix
                            (click)="
                                service.hideNewPassword =
                                    !service.hideNewPassword
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
                </div>
                <!-- confirmar contrasña -->
                <div class="sm:col-span-4">
                    <mat-form-field class="w-full">
                        <mat-label>Confirmar contraseña</mat-label>
                        <input
                            matInput
                            formControlName="confirmPassword"
                            name="confirmPassword"
                            [type]="
                                service.hideConfirmPassword
                                    ? 'password'
                                    : 'text'
                            "
                        />

                        <mat-icon
                            class="icon-size-5"
                            matPrefix
                            [svgIcon]="'heroicons_solid:key'"
                        ></mat-icon>

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
                                service.getCofirmPassswordErrorMessage(
                                    confirmPassword
                                )
                            }}</mat-error
                        >
                    </mat-form-field>
                </div>
            </div>
            <!-- Divider -->
            <div class="my-10 border-t"></div>

            <!-- Section -->
            <div class="w-full">
                <div class="text-xl">Rol</div>
                <div class="text-secondary">
                    Asigna un rol o varios roles al usuario.
                </div>
            </div>

            <div class="grid sm:grid-cols-4 gap-6 w-full mt-8">
                <!-- seleccionar role -->
                <div class="sm:col-span-4">
                    <mat-form-field class="w-full">
                        <mat-select
                            multiple
                            [placeholder]="'Roles'"
                            formControlName="roles"
                            name="roles"
                        >
                            <mat-option
                                *ngFor="
                                    let role of roles$ | async;
                                    trackBy: trackByFn
                                "
                                [value]="role"
                                >{{ role.name }}</mat-option
                            >
                        </mat-select>
                        <mat-icon
                            class="icon-size-5"
                            matPrefix
                            [svgIcon]="'heroicons_solid:user-group'"
                        ></mat-icon>
                    </mat-form-field>
                </div>
            </div>

            <!-- Divider -->
            <div class="my-10 border-t"></div>

            <!-- Actions -->
            <div class="flex items-center justify-end">
                <button mat-stroked-button type="button" (click)="navigateTo()">
                    Cancelar
                </button>
                <button
                    class="ml-4"
                    mat-flat-button
                    type="submit"
                    [color]="'primary'"
                    [disabled]="formGroup.invalid"
                >
                    Guardar
                </button>
            </div>

            <!-- <div
        class="flex items-center justify-end border-t -mx-8 mt-8 px-8 py-5 bg-gray-50 dark:bg-gray-700"
      >
        <button mat-button type="button" (click)="navigateTo()">
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
      </div> -->
        </form>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit {
    displayedColumns: string[] = ['roleName', 'selected'];

    roles$: Observable<Role[]> = this.userService.getAllRoles();

    formGroup!: FormGroup;
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
    ) {}

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
                        this.service.patternValidator(
                            this.service.controlHasNumber,
                            {
                                hasNumber: true,
                            }
                        ),
                        this.service.patternValidator(
                            this.service.controlHasCapitalCase,
                            {
                                hasCapitalCase: true,
                            }
                        ),
                        this.service.patternValidator(
                            this.service.controlHasSmallCase,
                            {
                                hasSmallCase: true,
                            }
                        ),
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
        if (this.form.invalid) {
            return;
        }
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
