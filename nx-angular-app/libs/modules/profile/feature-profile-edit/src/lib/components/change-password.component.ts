import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormCanDeactivate } from '@smec-monorepo/shared/confirm-dialog';
import { FormValidationService } from '@smec-monorepo/shared/utils';
import { ProfileService } from '../services';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-change-password',
  template: `
    <!-- <mat-card> -->
    <mat-card-header>
      <mat-card-title> Cambiar contraseña </mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <div fxLayout="row">
        <div fxFlex="50">
          <form
            class="custom-form"
            [formGroup]="formGroup"
            #form="ngForm"
            (ngSubmit)="onSubmit()"
          >
            <div fxLayout="column" fxLayoutAlign="space-around start">
              <div fxFill>
                <mat-form-field appearance="outline" color="accent">
                  <mat-label>Contraseña actual</mat-label>
                  <input
                    matInput
                    formControlName="currentPassword"
                    name="currentPassword"
                    [type]="service.hideCurrentPassword ? 'password' : 'text'"
                  />

                  <button
                    mat-icon-button
                    type="button"
                    matSuffix
                    (click)="
                      service.hideCurrentPassword = !service.hideCurrentPassword
                    "
                    [attr.aria-label]="'Hide password'"
                    [attr.aria-pressed]="service.hideCurrentPassword"
                  >
                    <mat-icon>{{
                      service.hideCurrentPassword
                        ? 'visibility_off'
                        : 'visibility'
                    }}</mat-icon>
                  </button>

                  <mat-error *ngIf="currentPassword?.invalid">
                    {{
                      service.getCurrentPassswordErrorMessage(currentPassword)
                    }}</mat-error
                  >
                </mat-form-field>

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
                  Cambiar
                </button>
              </div>
            </div>
          </form>
        </div>
        <div fxFlex="50">
          <app-undraw-settings
            fxLayoutAlign="start center"
            [width]="550"
            [height]="550"
          ></app-undraw-settings>
        </div>
      </div>
    </mat-card-content>
    <!-- </mat-card> -->
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent
  extends FormCanDeactivate
  implements OnInit
{
  formGroup!: FormGroup;
  formInitialValue!: any;
  isAddMode = false;

  @ViewChild('form') form!: NgForm;

  userId!: string;

  constructor(
    private fb: FormBuilder,
    public service: FormValidationService,
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    // this.userId = this.route.snapshot.params['id'];

    this.profileService.userId$.subscribe((id) => (this.userId = id));

    this.formGroup = this.fb.group(
      {
        currentPassword: ['', Validators.required],
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

    this.formInitialValue = this.formGroup.value;
  }

  get currentPassword(): AbstractControl | null {
    return this.formGroup.get('currentPassword');
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

    this.profileService
      .updatePassord(this.userId, this.formGroup.value)
      .subscribe(() => {
        this.profileService.showUpdatedPasswordSnackBar();
        this.profileService.precautionLogOut();
      });
  }
}
