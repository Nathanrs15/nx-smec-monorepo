/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    EventEmitter,
    Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
    RoleClaimsRequest,
    RolePermissionsByType,
    RolesFeatureService,
} from '../../data-access';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'app-manage-permissions',
    template: `
        <ng-container *ngIf="data">
            <form
                class="flex flex-col mt-4 px-8 pt-10 bg-card shadow rounded overflow-hidden"
                [formGroup]="formGroup"
                (ngSubmit)="onSubmit()"
            >
                <p class="text-lg font-medium">
                    Permisos para {{ resourceName }}
                </p>
                <p class="text-secondary mb-6">
                    Asigna los permisos que un rol tiene a un determinado
                    recurso.
                </p>
                <div class="flex flex-col gt-xs:flex-row">
                    <ng-container *ngFor="let item of data.roleClaims">
                        <div
                            class="flex-auto gt-xs:pr-3 grid grid-cols-1 gap-4 w-full mt-4"
                        >
                            <div class="flex items-center justify-between">
                                <div
                                    class="flex-auto leading-6 cursor-pointer"
                                    (click)="permission.toggle()"
                                >
                                    {{ item.description }}
                                </div>
                                <mat-slide-toggle
                                    class="ml-2"
                                    [color]="'primary'"
                                    [name]="item.value"
                                    [formControlName]="item.value"
                                    #permission
                                >
                                </mat-slide-toggle>
                            </div>
                        </div>
                    </ng-container>
                </div>

                <div
                    class="flex items-center justify-end border-t -mx-8 mt-8 px-8 py-5 bg-gray-50 dark:bg-gray-700"
                >
                    <button
                        type="submit"
                        class="px-6 ml-3"
                        mat-flat-button
                        [color]="'primary'"
                        [disabled]="disableForm || formGroup.invalid"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagePermissionsComponent /*implements OnInit*/ {
    _data!: RolePermissionsByType;
    get data(): RolePermissionsByType {
        return this._data;
    }
    @Input() set data(value: RolePermissionsByType) {
        this._data = value;
        this.getData();
    }

    private _resourceName: string;
    get resourceName(): string {
        return this._resourceName;
    }

    @Input() set resourceName(value: string) {
        this._resourceName = value;
    }

    @Output() update = new EventEmitter<RoleClaimsRequest[]>();

    roleClaims!: RoleClaimsRequest[];

    formGroup!: FormGroup;
    disableForm = true;

    displayedColumns: string[] = ['description', 'selected'];

    hasPermission = this.roleService.checkPermissions;

    constructor(private roleService: RolesFeatureService) {}

    // ngOnInit(): void {}

    onSubmit() {
        if (!this.formGroup.valid) {
            return;
        }
        this.roleClaims = this.roleService.updateRoleClaimsValues(
            this.roleClaims,
            this.formGroup
        );
        this.update.emit(this.roleClaims);
    }

    private getData() {
        this.disableForm = true;
        this.roleClaims = this.data.roleClaims;
        this.formGroup = this.roleService.createGroup(
            this.roleClaims,
            this.hasPermission.canEditPermissions
        );
        this.roleService.formNames = Object.keys(this.formGroup.controls);

        if (this.formGroup) {
            this.roleService.disableForm(this.formGroup).subscribe((value) => {
                this.disableForm = value;
            });
        }
    }
}
