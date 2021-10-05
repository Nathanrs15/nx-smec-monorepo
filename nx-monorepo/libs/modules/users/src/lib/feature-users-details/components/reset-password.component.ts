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
    <form
      class="flex flex-col mt-4 px-8 pt-10 bg-card shadow rounded overflow-hidden"
      [formGroup]="formGroup"
      (ngSubmit)="onSubmit()"
      #form="ngForm"
    >
      <p class="text-lg font-medium">Resetear contraseña</p>
      <p class="text-secondary mb-6">
        En caso de que un usuario olvide su contraseña.
      </p>

      <div class="flex flex-col gt-xs:flex-row">
        <mat-form-field class="flex-auto gt-xs:pl-3">
          <input
            matInput
            [placeholder]="'Contraseña nueva'"
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
            {{ service.getNewPassswordErrorMessage(newPassword) }}</mat-error
          >
        </mat-form-field>
        <mat-form-field class="flex-auto gt-xs:pl-3">
          <input
            matInput
            [placeholder]="'Confirmar contraseña'"
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
            (click)="service.hideConfirmPassword = !service.hideConfirmPassword"
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

      <div
        class="flex items-center justify-end border-t -mx-8 mt-8 px-8 py-5 bg-gray-50 dark:bg-gray-700"
      >
        <button
          type="submit"
          class="px-6 ml-3"
          mat-flat-button
          [color]="'primary'"
          [disabled]="formGroup.invalid"
        >
          Resetear
        </button>
      </div>
    </form>
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
