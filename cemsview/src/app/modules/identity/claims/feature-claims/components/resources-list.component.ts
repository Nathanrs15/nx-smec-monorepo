import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import { CheckPermissionService } from '@shared/utils';
import { Resource } from 'app/modules/identity/roles/data-access';

@Component({
    selector: 'app-resources-list',
    template: `
        <table
            class="min-w-240 overflow-y-visible"
            mat-table
            fixedLayout
            [dataSource]="resources"
        >
            <!-- name -->
            <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>Nombre del recurso</th>
                <td mat-cell *matCellDef="let element">
                    {{ element.name }}
                </td>
            </ng-container>

            <!-- apiName -->
            <ng-container matColumnDef="apiName">
                <th mat-header-cell *matHeaderCellDef>Nombre de API</th>
                <td mat-cell *matCellDef="let element">
                    {{ element.apiName }}
                </td>
            </ng-container>

            <!-- description -->
            <ng-container matColumnDef="description">
                <th mat-header-cell *matHeaderCellDef>Descripción</th>
                <td mat-cell *matCellDef="let element">
                    {{ element.description }}
                </td>
            </ng-container>

            <!-- actions -->
            <ng-container matColumnDef="action">
                <th mat-header-cell *matHeaderCellDef>Acciones</th>
                <td mat-cell *matCellDef="let element">
                    <button
                        mat-icon-button
                        [matMenuTriggerFor]="menu"
                        [matMenuTriggerData]="{ selection: element }"
                    >
                        <mat-icon>more_vert</mat-icon>
                    </button>
                </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>

        <mat-menu #menu="matMenu">
            <ng-template matMenuContent let-selection="selection">
                <button
                    mat-menu-item
                    [routerLink]="['edit-resource', selection.id]"
                    routerLinkActive="active"
                    [disabled]="!canEditResources"
                >
                    <mat-icon>settings</mat-icon>
                    <span>Editar recurso</span>
                </button>
            </ng-template>
        </mat-menu>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesListComponent implements OnInit {
    @Input() resources!: Resource[];

    displayedColumns: string[] = ['name', 'apiName', 'description', 'action'];

    canEditResources = this.checkPermission.hasPermission('Resources.Edit');
    canCreateResources = this.checkPermission.hasPermission('Resources.Create');

    constructor(private checkPermission: CheckPermissionService) {}

    ngOnInit(): void {}
}
