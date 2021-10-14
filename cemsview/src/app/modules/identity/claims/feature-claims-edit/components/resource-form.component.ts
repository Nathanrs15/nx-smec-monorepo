/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/member-ordering */
import {
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ViewChild,
    Input,
} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    NgForm,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '@shared/utils';
import { ClaimsService } from '../../data-access';

@Component({
    selector: 'app-resource-form',
    template: `
        <form [formGroup]="formGroup" #form="ngForm" (ngSubmit)="onSubmit()">
            <!-- Nombre del recurso -->
            <div class="w-full">
                <div class="text-xl">Añadir un recurso</div>
                <div class="text-secondary">
                    Configuración de un recurso del sistema
                </div>
            </div>
            <div class="grid sm:grid-cols-4 gap-6 w-full mt-8">
                <div class="sm:col-span-4">
                    <mat-form-field class="w-full">
                        <mat-label>Nombre del recurso</mat-label>
                        <input matInput formControlName="name" name="name" />

                        <button
                            *ngIf="name?.dirty"
                            mat-icon-button
                            matSuffix
                            (click)="restartForm('name')"
                        >
                            <mat-icon>{{
                                isAddMode ? 'close' : 'restart_alt'
                            }}</mat-icon>
                        </button>
                    </mat-form-field>
                </div>

                <div class="sm:col-span-4">
                    <mat-form-field class="w-full">
                        <mat-label>Nombre de API</mat-label>
                        <input
                            matInput
                            formControlName="apiName"
                            name="apiName"
                        />

                        <button
                            *ngIf="apiName?.dirty"
                            mat-icon-button
                            matSuffix
                            (click)="restartForm('apiName')"
                        >
                            <mat-icon>{{
                                isAddMode ? 'close' : 'restart_alt'
                            }}</mat-icon>
                        </button>
                    </mat-form-field>
                </div>

                <div class="sm:col-span-4">
                    <mat-form-field class="w-full">
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
                            <mat-icon>{{
                                isAddMode ? 'close' : 'restart_alt'
                            }}</mat-icon>
                        </button>
                    </mat-form-field>
                </div>
            </div>

            <!-- Divider -->
            <div class="my-10 border-t"></div>

            <!-- Actions -->
            <div class="flex items-center justify-end">
                <button mat-stroked-button type="button" (click)="navigateTo()">
                    Cancelar
                </button>
                <button
                    class="ml-4"
                    mat-flat-button
                    type="submit"
                    [color]="'primary'"
                    [disabled]="
                        formGroup.invalid ||
                        (!formGroup.touched && !formGroup.dirty)
                    "
                >
                    Guardar
                </button>
            </div>


        </form>
    `,
    styles: [],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceFormComponent implements OnInit {
    @Input() id!: string;
    @Input() isAddMode: boolean;

    formGroup!: FormGroup;
    formInitialValue!: any;

    @ViewChild('form') form!: NgForm;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private resourceService: ClaimsService,
        private snackbarService: SnackbarService
    ) {}

    ngOnInit(): void {
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
        if (this.formGroup.invalid) {
            return;
        }

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
        this.router.navigate(['app/resources']);
    }
}
