import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  controlHasNumber = /\d/;
  controlHasCapitalCase = /[A-Z]/;
  controlHasSmallCase = /[a-z]/;
  controlHasSpecialCharacters = /[!@#$%^&*]/;

  hideCurrentPassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;

  // constructor() {}

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = regex.test(control.value);
      return forbidden ? null : error;
    };
  }

  getCurrentPassswordErrorMessage(control: AbstractControl | null): string {
    return control?.hasError('required')
      ? 'Debes escribir una contraseña'
      : control?.hasError('currentPassword')
      ? 'Contraseña no válida'
      : control?.hasError('confirmedValidator')
      ? 'Las contraseñas deben coincidir'
      : '';
  }

  getNewPassswordErrorMessage(control: AbstractControl | null): string {
    return control?.hasError('required')
      ? 'Debes escribir una contraseña'
      : control?.hasError('newPassword')
      ? 'Contraseña no válida'
      : control?.hasError('confirmedValidator')
      ? 'Las contraseñas deben coincidir'
      : control?.hasError('minlength')
      ? 'Mínimo 6 carácteres'
      : control?.hasError('hasNumber')
      ? 'Debe contener almenos un número'
      : control?.hasError('hasCapitalCase')
      ? 'Debe contener almenos una letra mayúscula'
      : control?.hasError('hasSmallCase')
      ? 'Debe contener almenos una letra minúscula'
      : control?.hasError('hasSpecialCharacters')
      ? 'Debe contener carácteres especiales'
      : '';
  }

  getCofirmPassswordErrorMessage(control: AbstractControl | null): string {
    return control?.hasError('required')
      ? 'Debes confirmar la contraseña'
      : control?.hasError('confirmedValidator')
      ? 'Las contraseñas deben coincidir'
      : '';
  }
}
