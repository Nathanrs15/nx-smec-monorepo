/* eslint-disable @typescript-eslint/member-ordering */
import {
    Component,
    OnInit,
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
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { SnackbarService } from '@shared/utils';

import { RolesFeatureService } from '../../../data-access';
@Component({
    selector: 'role-form',
    template: `
        <form [formGroup]="formGroup" #form="ngForm" (ngSubmit)="onSubmit()">
            <!-- Section  -->
            <div class="w-full">
                <div class="text-xl">
                    {{ isAddMode ? 'Añadir' : 'Editar' }} rol
                </div>
                <div class="text-secondary">
                    {{
                        isAddMode
                            ? 'Asignar un nombre al rol.'
                            : 'Cambiar el nombre al rol.'
                    }}
                </div>
            </div>

            <div class="grid sm:grid-cols-4 gap-6 w-full mt-8">
                <!-- userName -->
                <div class="sm:col-span-4">
                    <mat-form-field class="w-full">
                        <mat-label>Nombre del rol</mat-label>
                        <input
                            matInput
                            placeholder="Role name"
                            name="name"
                            formControlName="name"
                            required
                        />

                        <mat-icon
                            class="icon-size-5"
                            matPrefix
                            [svgIcon]="'heroicons_solid:user-group'"
                        ></mat-icon>

                        <button *ngIf="name?.dirty" mat-icon-button matSuffix>
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
            <div class="flex items-center">
                <button
                    *ngIf="!isAddMode"
                    type="button"
                    mat-button
                    [color]="'warn'"
                    (click)="deleteRole()"
                >
                    Delete
                </button>

                <button
                    class="ml-auto"
                    mat-stroked-button
                    type="button"
                    (click)="navigateToRoles()"
                >
                    Cancelar
                </button>
                <button
                    class="ml-4"
                    mat-flat-button
                    type="submit"
                    [color]="'primary'"
                    [disabled]="formGroup.invalid"
                >
                    Guardar
                </button>
            </div>
        </form>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleFormComponent implements OnInit {
    formGroup!: FormGroup;
    formInitialValue!: any;

    returnUrl = '/roles';

    @ViewChild('form') form!: NgForm;

    @Input() id!: string;
    @Input() isAddMode: boolean;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private rolesService: RolesFeatureService,
        private snackbarService: SnackbarService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {
        // super();
    }

    ngOnInit(): void {
        this.formGroup = this.fb.group({
            id: '',
            name: ['', Validators.required],
            concurrencyStamp: '',
            normalizedName: '',
        });

        if (!this.isAddMode) {
            this.rolesService.getRoleById(this.id).subscribe((role) => {
                this.formGroup.patchValue(role);
                this.formInitialValue = this.formGroup.value;
            });
        }
    }

    get name(): AbstractControl | null {
        return this.formGroup.get('name');
    }

    navigateToRoles() {
        this.router.navigate([this.returnUrl], {
            relativeTo: this.route,
        });
    }

    navigateToRolePermissions(id: string) {
        this.router.navigate(['/roles/manage-permissions', id], {
            relativeTo: this.route,
        });
    }

    onSubmit() {
        if (this.formGroup.invalid) {
            return;
        }

        if (this.isAddMode) {
            this.rolesService
                .createRole(this.formGroup.value)
                .subscribe((result) => {
                    this.snackbarService.openSnackBar(
                        `Rol ${this.name?.value} añadido`,
                        'Aceptar'
                    );

                    this.navigateToRolePermissions(result.id);
                });
        } else {
            this.rolesService
                .updateRole(this.id, this.formGroup.value)
                .subscribe(() => {
                    this.snackbarService.openSnackBar(
                        `Rol ${this.name?.value} actualizado`,
                        'Aceptar'
                    );
                    this.navigateToRoles();
                });
        }
    }

    deleteRole() {
        // Open the confirmation dialog
        // eslint-disable-next-line no-underscore-dangle
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar rol',
            message:
                '¿Estás seguro que quieres eliminar este rol? ¡Esta acción es irreversible!',
            actions: {
                confirm: {
                    label: 'Eliminar',
                },
            },
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            console.log('dialog result', result);

            // If the confirm button pressed...
            if (result === 'confirmed') {
                console.log();

                // Delete the contact
                this.rolesService.deleteRole(this.id).subscribe(() => {
                    this.router.navigate([this.returnUrl]);
                });
            }
        });
    }
}
