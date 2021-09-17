import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { CheckPermissionService } from '@smec-monorepo/shared/utils';
import { Resource } from '@smec-monorepo/shared/models';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-resources-list',
  template: `
    <h2 class="view-title">Administrar recursos del sistema</h2>
    <mat-card class="table-card">
      <table mat-table fixedLayout [dataSource]="resources">
        <!-- name -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Nombre del recurso</th>
          <td mat-cell *matCellDef="let element">{{ element.name }}</td>
        </ng-container>

        <!-- apiName -->
        <ng-container matColumnDef="apiName">
          <th mat-header-cell *matHeaderCellDef>Nombre de API</th>
          <td mat-cell *matCellDef="let element">{{ element.apiName }}</td>
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
          <th mat-header-cell *matHeaderCellDef>
            <button
              mat-icon-button
              routerLink="./add-resource"
              [disabled]="!canCreateResources"
            >
              <mat-icon>add_circle</mat-icon>
            </button>
          </th>
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
    </mat-card>

    <mat-menu #menu="matMenu">
      <ng-template matMenuContent let-selection="selection">
        <button
          mat-menu-item
          [routerLink]="['edit-resource', selection.id]"
          routerLinkActive="active"
          [disabled]="!canEditResources"
        >
          <mat-icon>settings</mat-icon>
          <span>Edit resource</span>
        </button>
      </ng-template>
    </mat-menu>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesListComponent {
  @Input() resources!: Resource[];

  displayedColumns: string[] = ['name', 'apiName', 'description', 'action'];

  canEditResources = this.checkPermission.hasPermission('Resources.Edit');
  canCreateResources = this.checkPermission.hasPermission('Resources.Create');

  constructor(private checkPermission: CheckPermissionService) {}

  // ngOnInit(): void {}
}
