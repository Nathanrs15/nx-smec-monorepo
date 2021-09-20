import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-user-filters',
  template: `
    <mat-selection-list>
      <div mat-subheader>Roles</div>
      <mat-list-option> Administrador </mat-list-option>
      <mat-list-option> Configurador </mat-list-option>
      <mat-list-option> Visualizador </mat-list-option>
    </mat-selection-list>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFiltersComponent  {
  // constructor() {}

  // ngOnInit(): void {}
}
