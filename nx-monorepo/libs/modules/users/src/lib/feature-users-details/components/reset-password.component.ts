import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { UserService } from '../../data-access';
import { FormValidationService } from '@smec-monorepo/shared';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-reset-password',
  template: `
    <div class="w-full max-w-3xl">
      <form [formGroup]="formGroup" (ngSubmit)="onSubmit()" #form="ngForm">
        <!-- Section -->
        <div class="w-full">
          <div class="text-xl">Reestablecer contraseña</div>
          <div class="text-secondary">
            En caso de que un usuario olvide su contraseña.
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
                [type]="service.hideNewPassword ? 'password' : 'text'"
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
                (click)="service.hideNewPassword = !service.hideNewPassword"
                [attr.aria-label]="'Hide password'"
                [attr.aria-pressed]="service.hideNewPassword"
              >
                <mat-icon>{{
                  service.hideNewPassword ? 'visibility_off' : 'visibility'
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
                [type]="service.hideConfirmPassword ? 'password' : 'text'"
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
                  service.hideConfirmPassword = !service.hideConfirmPassword
                "
                [attr.aria-label]="'Hide password'"
                [attr.aria-pressed]="service.hideConfirmPassword"
              >
                <mat-icon>{{
                  service.hideConfirmPassword ? 'visibility_off' : 'visibility'
                }}</mat-icon>
              </button>
              <mat-error *ngIf="confirmPassword?.invalid">
                {{
                  service.getCofirmPassswordErrorMessage(confirmPassword)
                }}</mat-error
              >
            </mat-form-field>
          </div>
        </div>

        <!-- Divider -->
        <div class="my-10 border-t"></div>

        <!-- Actions -->
        <div class="flex items-center justify-end">
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
      </form>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent implements OnInit {
  formGroup!: FormGroup;
  formInitialValue!: any;
  isAddMode = false;

  @ViewChild('form') form!: NgForm;

  @Input() userId!: string;

  constructor(
    private fb: FormBuilder,
    public service: FormValidationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group(
      {
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
      },
      {
        validator: this.service.ConfirmedValidator(
          'newPassword',
          'confirmPassword'
        ),
      }
    );
  }

  get newPassword(): AbstractControl | null {
    return this.formGroup.get('newPassword');
  }

  get confirmPassword(): AbstractControl | null {
    return this.formGroup.get('confirmPassword');
  }

  onSubmit() {
    if (!this.formGroup.valid) return;
    console.log(this.formGroup.value);

    this.userService
      .resettUserPassword(this.userId, this.formGroup.value)
      .subscribe(() => {
        this.userService.showResetedPasswordSnackBar();
      });
  }
}
