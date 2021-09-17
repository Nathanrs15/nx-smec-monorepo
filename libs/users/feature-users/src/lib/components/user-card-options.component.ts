import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UtilsService } from '@smec-monorepo/shared/utils';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-user-card-options',
  template: `
    <mat-card class="filter-card">
      <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="20px">
        <mat-form-field appearance="outline">
          <mat-label>Buscar</mat-label>
          <input matInput placeholder="Ej. Administrador" #input />
        </mat-form-field>
        <div fxFlex fxLayoutAlign="flex-end" fxLayoutGap="20px">
          <button mat-flat-button color="primary" (click)="toggleDrawer()">
            <mat-icon>filter_list</mat-icon>
            Ver filtros
          </button>
          <button mat-flat-button color="primary" routerLink="./add-user">
            <mat-icon>add</mat-icon>
            Añadir usuario
          </button>
        </div>
      </div>
    </mat-card>
  `,
  styles: [
    `
      .mat-form-field {
        width: 30%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardOptionsComponent {
  constructor(private drawerService: UtilsService) {}

  // ngOnInit(): void {}

  toggleDrawer() {
    this.drawerService.toggleFilter();
  }
}
