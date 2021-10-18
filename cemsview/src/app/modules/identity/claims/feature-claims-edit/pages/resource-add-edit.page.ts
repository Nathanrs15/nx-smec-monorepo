/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    template: `
        <div class="flex flex-col flex-auto w-full">
            <div
                class="flex flex-wrap w-full max-w-screen-xl mx-auto p-6 md:p-8"
            >
                <!-- Title and action buttons -->
                <div class="flex items-center justify-between w-full">
                    <div>
                        <!-- Breadcrumbs -->
                        <div class="flex flex-wrap items-center font-medium">
                            <div>
                                <a
                                    class="whitespace-nowrap text-primary-500"
                                    [routerLink]="['/resources']"
                                    >Recursos</a
                                >
                            </div>
                            <div
                                class="flex items-center ml-1 whitespace-nowrap"
                            >
                                <mat-icon
                                    class="icon-size-5 text-secondary"
                                    [svgIcon]="'heroicons_solid:chevron-right'"
                                ></mat-icon>
                                <div>
                                    {{ isAddMode ? 'Añadir' : 'Editar' }}
                                    recurso
                                </div>
                            </div>
                        </div>
                        <div
                            class="mt-2 text-3xl font-semibold tracking-tight leading-8"
                        >
                            Recursos
                        </div>
                        <!-- <div class="font-medium tracking-tight text-secondary"></div> -->
                    </div>
                </div>
                <div class="w-full max-w-3xl">
                    <div class="mt-8">
                        <app-resource-form
                            [id]="id"
                            [isAddMode]="isAddMode"
                        ></app-resource-form>

                        <app-edit-permissions
                            *ngIf="!isAddMode"
                            [resourceId]="id"
                        ></app-edit-permissions>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [],
})
export class ResourceAddEditPage implements OnInit {
    id!: string;
    isAddMode!: boolean;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
    }
}
