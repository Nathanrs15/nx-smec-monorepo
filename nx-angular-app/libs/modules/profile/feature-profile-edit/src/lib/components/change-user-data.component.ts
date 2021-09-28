import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { switchMap, take, tap } from 'rxjs/operators';
import { UserInfo } from '../info.model';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { FormCanDeactivate } from '@smec-monorepo/shared/confirm-dialog';
import { ProfileService } from '../services';
import { Observable } from 'rxjs';
import { UtilsService } from '@smec-monorepo/shared/utils';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-change-user-data',
  template: `
    <!-- <mat-card> -->
    <ng-container *ngIf="data$ | async as data">
      <mat-card-header>
        <mat-card-title> Información de usuario </mat-card-title>
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
                <div fxLayout="row" fxFill>
                  <mat-form-field
                    appearance="outline"
                    color="accent"
                    style="margin-right: 1em;"
                  >
                    <mat-label>Nombre de usuario</mat-label>
                    <input
                      matInput
                      formControlName="userName"
                      name="userName"
                    />
                    <button
                      *ngIf="userName?.dirty"
                      mat-icon-button
                      matSuffix
                      (click)="restartForm('userName')"
                    >
                      <mat-icon>restart_alt</mat-icon>
                    </button>
                  </mat-form-field>

                  <mat-form-field appearance="outline" color="accent">
                    <mat-label>Correo electrónico</mat-label>
                    <input matInput formControlName="email" name="email" />
                    <button
                      *ngIf="email?.dirty"
                      mat-icon-button
                      matSuffix
                      (click)="restartForm('email')"
                    >
                      <mat-icon>restart_alt</mat-icon>
                    </button>
                  </mat-form-field>
                </div>

                <div fxLayout="row" fxFill>
                  <mat-form-field
                    appearance="outline"
                    color="accent"
                    style="margin-right: 1em;"
                  >
                    <mat-label>Nombre</mat-label>
                    <input matInput />
                  </mat-form-field>

                  <mat-form-field appearance="outline" color="accent">
                    <mat-label>Apellido</mat-label>
                    <input matInput />
                  </mat-form-field>
                </div>

                <div fxFill>
                  <mat-form-field appearance="outline" color="accent">
                    <mat-label>Roles de usuario</mat-label>
                    <input matInput [value]="data.roles.join(', ')" disabled />
                  </mat-form-field>
                </div>

                <div class="form-submit-section" fxLayout="row">
                  <button
                    mat-button
                    class="submit-section-btn"
                    type="submit"
                    color="primary"
                    [disabled]="
                      formGroup.invalid ||
                      (!formGroup.touched && !formGroup.dirty)
                    "
                  >
                    Guardar
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
    </ng-container>
    <!-- </mat-card> -->
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeUserDataComponent
  extends FormCanDeactivate
  implements OnInit
{
  formGroup!: FormGroup;
  formInitialValue!: any;
  isAddMode = false;

  userId!: string;

  @ViewChild('form') form!: NgForm;

  data$!: Observable<UserInfo>;

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private service: UtilsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    // this.userId = this.route.snapshot.params['id'];
    this.data$ = this.profileService.userId$.pipe(
      switchMap((id) => {
        this.userId = id;
        return this.getData(id);
      }),
      take(1)
    );

    this.formGroup = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  get userName(): AbstractControl | null {
    return this.formGroup.get('userName');
  }
  get email(): AbstractControl | null {
    return this.formGroup.get('email');
  }

  toggleTheme(darkMode: boolean) {
    const darkClassName = 'darkMode';
    const className = darkMode ? darkClassName : '';

    localStorage.setItem('theme', className);
    this.service.setTheme(className);
  }

  getData(id: string) {
    return this.profileService.getUserById(id).pipe(
      tap((data) => {
        this.formGroup.patchValue(data.user);
        this.formInitialValue = this.formGroup.value;
      })
    );
  }

  onSubmit(): void {
    if (this.formGroup.invalid) return;

    console.log('onSubmit');
  }
}
