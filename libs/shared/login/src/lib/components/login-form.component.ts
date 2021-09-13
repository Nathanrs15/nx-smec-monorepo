import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@smec-monorepo/shared/data-access';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-login-form',
  template: `
    <div class="form-container" fxLayout="column">
      <div class="avatar">
        <!-- <img [src]="avatar" /> -->
        <!-- <app-undraw-avatar [width]="200" [height]="200"></app-undraw-avatar> -->
      </div>
      <div class="form-header">
        <h1 class="login-text">Welcome back!</h1>
        <h3 class="login-text">Please Log in to your account</h3>
      </div>
      <div>
        <form [formGroup]="form" (ngSubmit)="onSubmit()" fxLayout="column">
          <mat-form-field appearance="outline" color="primary">
            <mat-label>Email</mat-label>
            <input matInput formControlName="Email" name="Email" />
          </mat-form-field>

          <mat-form-field appearance="outline" color="primary">
            <mat-label>Enter your password</mat-label>
            <input
              matInput
              name="Password"
              formControlName="Password"
              [type]="hide ? 'password' : 'text'"
            />
            <button
              mat-icon-button
              type="button"
              matSuffix
              (click)="hide = !hide"
              [attr.aria-label]="'Hide password'"
              [attr.aria-pressed]="hide"
            >
              <mat-icon>{{ hide ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
          </mat-form-field>
          <button
            mat-raised-button
            type="submit"
            color="primary"
            routerLink="app"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./components-styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  hide = true;

  avatar = 'assets/undraw/avatar.svg';

  form!: FormGroup;
  loading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authservice: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      Email: ['administrador@gmail.com', Validators.required],
      Password: ['Sige!445', Validators.required],
    });
  }

  get Email(): AbstractControl | null {
    return this.form.get('Email');
  }
  get Password(): AbstractControl | null {
    return this.form.get('Password');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.JwtAuth(this.form.value.Email, this.form.value.Password);
    // this.store.dispatch(login({ payload: this.form.value }));
  }

  private JwtAuth(email: string, password: string) {
    this.authservice.login(email, password).subscribe(
      (result) => {
        console.log('SDAUFASDFASDF');

        setTimeout(() => {
          this.router.navigate(['app']);
        }, 1000);
      },
      (error) => {
        console.log('Login error', error);
        this.form.setErrors({
          auth: 'Usuario o contraseña inconrrectos',
        });
      }
    );
  }

  // retrieve a FormControl
  getFormControl(name: string): AbstractControl | null {
    return this.form.get(name);
  }
  // returns TRUE if the FormControl is valid
  isValid(name: string): boolean | null {
    const e = this.getFormControl(name);
    return e && e.valid;
  }
  // returns TRUE if the FormControl has been changed
  isChanged(name: string): boolean | null {
    const e = this.getFormControl(name);
    return e && (e.dirty || e.touched);
  }
  // returns TRUE if the FormControl is invalid after user changes
  hasError(name: string): boolean | null {
    const e = this.getFormControl(name);
    return e && (e.dirty || e.touched) && !e.valid;
  }

  getPassswordErrorMessage(): string {
    if (!this.Password) {
      return '';
    }
    return this.Password.hasError('required')
      ? 'Debes escribir una contraseña'
      : this.Password.hasError('Password')
      ? 'Contraseña no válida'
      : '';
  }

  getUserNameErrorMessage(): string {
    if (!this.Email) {
      return '';
    }
    return this.Email.hasError('required')
      ? 'Debes escribir un nombre de usuario'
      : '';
  }
}
