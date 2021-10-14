/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    ViewChild,
} from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ClaimsService, Permission } from '../../data-access';

@Component({
    selector: 'app-edit-permissions',
    template: `
        <ng-container *ngIf="permissionsSource$ | async as permissions">
            <form
                [formGroup]="formGroup"
                #form="ngForm"
                (ngSubmit)="onSubmit()"
            >
                <!-- Nombre del recurso -->
                <div class="w-full">
                    <div class="text-xl">Añadir un recurso</div>
                    <div class="text-secondary">
                        Configuración de un recurso del sistema
                    </div>
                </div>

                <div class="grid sm:grid-cols-4 gap-6 w-full mt-8">
                    <div class="sm:col-span-4">
                        <mat-form-field
                            class="w-full"
                            *ngFor="let p of permissions"
                        >
                            <mat-label>
                                Descripción para {{ p.value }}</mat-label
                            >
                            <input
                                matInput
                                [formControlName]="p.value"
                                [name]="p.value"
                            />

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
                </div>
                <!-- Divider -->
                <div class="my-10 border-t"></div>

                <!-- Actions -->
                <div class="flex items-center justify-end">
                    <button
                        mat-stroked-button
                        type="button"
                        (click)="form.reset(formInitialValue)"
                    >
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
        </ng-container>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPermissionsComponent implements OnInit {
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

    constructor(private resourceService: ClaimsService) {}

    ngOnInit(): void {}

    getResourcePermissions() {
        this.permissionsSource$ = this.resourceService
            .getResourcePermissions(this.resourceId)
            .pipe(
                tap((data) => {
                    this.formGroup = this.resourceService.createFormGroup(data);
                    this.resourceService.formNames = Object.keys(
                        this.formGroup.controls
                    );
                    this.formInitialValue = this.formGroup.value;
                    this.permissions = data;
                }),
                take(1)
            );
    }

    onSubmit() {
        if (!this.formGroup.valid) {
            return;
        }

        this.permissions = this.resourceService.updatePermissionsValues(
            this.permissions,
            this.formGroup
        );

        this.resourceService
            .updatePermissions(this.permissions)
            .subscribe(() => {
                this.resourceService.showUpdatedPermissionsSnackBar();
                this.getResourcePermissions();
            });
    }
}
