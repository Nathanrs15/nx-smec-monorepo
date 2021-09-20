import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormCanDeactivate } from '@smec-monorepo/shared/ui';
import { GridBreakpointService, SnackbarService } from '@smec-monorepo/shared/utils';
import { ResourcesFeatureService } from '@smec-monorepo/claims/data-access';

@Component({
  template: `
    <h2 class="view-title">
      {{ isAddMode ? 'Añadir nuevo' : 'Editar' }} recurso
    </h2>
    <mat-card>
      <form
        class="custom-form"
        [formGroup]="formGroup"
        #form="ngForm"
        (ngSubmit)="onSubmit()"
      >
        <div fxLayout="column" fxLayoutAlign="space-around start">
          <div [fxLayout]="(breakpoint$ | async) ? 'column' : 'row'" fxFill>
            <mat-form-field
              appearance="outline"
              color="accent"
              style="margin-right: 1em;"
            >
              <mat-label>Nombre del recurso</mat-label>
              <input matInput formControlName="name" name="name" />

              <button
                *ngIf="name?.dirty"
                mat-icon-button
                matSuffix
                (click)="restartForm('name')"
              >
                <mat-icon>{{ isAddMode ? 'close' : 'restart_alt' }}</mat-icon>
              </button>
            </mat-form-field>

            <mat-form-field appearance="outline" color="accent">
              <mat-label>Nombre de API</mat-label>
              <input matInput formControlName="apiName" name="apiName" />

              <button
                *ngIf="apiName?.dirty"
                mat-icon-button
                matSuffix
                (click)="restartForm('apiName')"
              >
                <mat-icon>{{ isAddMode ? 'close' : 'restart_alt' }}</mat-icon>
              </button>
            </mat-form-field>
          </div>

          <div fxFill>
            <mat-form-field appearance="outline" color="accent">
              <mat-label>Descripción</mat-label>
              <input
                matInput
                formControlName="description"
                name="description"
              />

              <button
                *ngIf="description?.dirty"
                mat-icon-button
                matSuffix
                (click)="restartForm('description')"
              >
                <mat-icon>{{ isAddMode ? 'close' : 'restart_alt' }}</mat-icon>
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

            <button mat-button type="button" (click)="navigateTo()">
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </mat-card>

    <app-edit-permissions
      *ngIf="!isAddMode"
      [resourceId]="id"
    ></app-edit-permissions>
  `,
  styles: [],
})
export class ResourceAddEditPage extends FormCanDeactivate implements OnInit {
  id!: string;

  formGroup!: FormGroup;
  isAddMode!: boolean;
  formInitialValue!: any;

  breakpoint$ = this.gridService.mobileBreakpoint$;

  @ViewChild('form') form!: NgForm;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private resourceService: ResourcesFeatureService,
    private snackbarService: SnackbarService,
    private gridService: GridBreakpointService
  ) {
    super();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      apiName: ['', Validators.required],
      description: ['', Validators.required],
    });

    if (!this.isAddMode) {
      this.resourceService.getResourceById(this.id).subscribe((x) => {
        this.formGroup.patchValue(x);
        this.formInitialValue = this.formGroup.value;
      });
    }
  }

  get name(): AbstractControl | null {
    return this.formGroup.get('name');
  }
  get apiName(): AbstractControl | null {
    return this.formGroup.get('apiName');
  }
  get description(): AbstractControl | null {
    return this.formGroup.get('description');
  }

  onSubmit(): void {
    if (this.formGroup.invalid) return;

    if (this.isAddMode) {
      this.resourceService
        .createResource(this.formGroup.value)
        .subscribe(() => {
          this.snackbarService.openSnackBar(
            `Recurso ${this.name?.value} añadido`,
            'Aceptar'
          );
          this.navigateTo();
        });
    } else {
      this.resourceService
        .updateResource(this.id, this.formGroup.value)
        .subscribe(() => {
          this.snackbarService.openSnackBar(
            `Recurso ${this.name?.value} actualizado`,
            'Aceptar'
          );
          this.navigateTo();
        });
    }
  }

  navigateTo() {
    this.router.navigate([this.returnUrl()], {
      relativeTo: this.route,
    });
  }
}
