import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '@smec-monorepo/shared/models';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormCanDeactivate } from '@smec-monorepo/shared/ui';
import { UserService } from '@smec-monorepo/users/data-access';
import {
  FormValidationService,
  GridBreakpointService,
} from '@smec-monorepo/shared/utils';

@Component({
  templateUrl: './user-add.page.html',
  styleUrls: ['./user-add.page.scss'],
})
export class UserAddPage extends FormCanDeactivate implements OnInit {
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
    super();
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
    // this.userStore.createUser(this.form.value);
    // this.navigateTo();
  }

  navigateTo() {
    this.router.navigate([this.returnUrl()], { relativeTo: this.route });
  }

  trackByFn(index: number, item: any) {
    return index;
  }
}
