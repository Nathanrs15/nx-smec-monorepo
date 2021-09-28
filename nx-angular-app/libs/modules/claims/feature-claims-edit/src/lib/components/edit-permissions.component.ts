import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
} from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { FormCanDeactivate } from '@smec-monorepo/shared/confirm-dialog';
import { Permission } from '@smec-monorepo/modules-claims-data-access';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ResourcesFeatureService } from '@smec-monorepo/modules-claims-data-access';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-edit-permissions',
  template: `
    <ng-container *ngIf="permissionsSource$ | async as permissions">
      <h2 class="view-title">Editar descripciones de los permisos</h2>
      <mat-card>
        <form
          class="custom-form"
          [formGroup]="formGroup"
          #form="ngForm"
          (ngSubmit)="onSubmit()"
        >
          <div fxLayout="column" fxLayoutAlign="space-around start" fxFill>
            <mat-form-field
              color="accent"
              appearance="outline"
              style="margin-right: 1em;"
              *ngFor="let p of permissions"
            >
              <mat-label> Descripción para {{ p.value }}</mat-label>
              <input matInput [formControlName]="p.value" [name]="p.value" />

              <button
                *ngIf="formGroup?.dirty"
                mat-icon-button
                matSuffix
                (click)="restartForm(p.value)"
              >
                <mat-icon>restart_alt</mat-icon>
              </button>
            </mat-form-field>
          </div>

          <div class="form-submit-section" fxLayout="row">
            <button
              mat-button
              class="submit-section-btn"
              type="submit"
              color="primary"
              [disabled]="
                formGroup.invalid || (!formGroup.touched && !formGroup.dirty)
              "
            >
              Guardar
            </button>

            <button
              mat-button
              type="button"
              (click)="form.reset(formInitialValue)"
            >
              Cancelar
            </button>
          </div>
        </form>
      </mat-card>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPermissionsComponent extends FormCanDeactivate {
  _resourceId!: any;
  get resourceId(): any {
    return this._resourceId;
  }
  @Input() set resourceId(value: any) {
    this._resourceId = value;
    this.getResourcePermissions();
  }

  permissionsSource$!: Observable<Permission[]>;
  permissions!: Permission[];

  formGroup!: FormGroup;
  isAddMode = false;
  formInitialValue!: any;

  @ViewChild('form') form!: NgForm;

  constructor(private resourceService: ResourcesFeatureService) {
    super();
  }

  // ngOnInit(): void {}

  getResourcePermissions() {
    this.permissionsSource$ = this.resourceService
      .getResourcePermissions(this.resourceId)
      .pipe(
        tap((data) => {
          this.formGroup = this.resourceService.createFormGroup(data);
          this.resourceService.formNames = Object.keys(this.formGroup.controls);
          this.formInitialValue = this.formGroup.value;
          this.permissions = data;
        }),
        take(1)
      );
  }

  onSubmit() {
    if (!this.formGroup.valid) return;

    this.permissions = this.resourceService.updatePermissionsValues(
      this.permissions,
      this.formGroup
    );

    this.resourceService.updatePermissions(this.permissions).subscribe(() => {
      this.resourceService.showUpdatedPermissionsSnackBar();
      this.getResourcePermissions();
    });
  }
}
