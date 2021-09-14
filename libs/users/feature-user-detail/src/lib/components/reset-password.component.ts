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
import { FormValidationService } from '@smec-monorepo/shared/utils';
import { UserService } from '@smec-monorepo/users/data-access';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-reset-password',
  template: `
    <!-- <h2 class="view-title">Resetear contraseña</h2> -->

    <mat-card>
      <mat-card-header>
        <mat-card-title> Resetear contraseña </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form
          class="custom-form"
          [formGroup]="formGroup"
          (ngSubmit)="onSubmit()"
          #form="ngForm"
        >
          <div fxLayout="column" fxLayoutAlign="space-around start">
            <div fxFill>
              <mat-form-field appearance="outline" color="accent">
                <mat-label>Contraseña nueva</mat-label>
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
              <mat-form-field appearance="outline" color="accent">
                <mat-label>Confirmar contraseña nueva</mat-label>
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
                    service.hideConfirmPassword = !service.hideConfirmPassword
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
            <div class="form-submit-section" fxLayout="row">
              <button
                mat-button
                class="submit-section-btn"
                type="submit"
                color="primary"
                [disabled]="formGroup.invalid"
              >
                Resetear
              </button>
            </div>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
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
