import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-user-empty-state',
  template: `
    <div class="wrapper">
      <div class="inner">
        <app-custom-empty-state
          [title]="emptyEstate.title"
          [description]="emptyEstate.description"
        >
          <button mat-flat-button color="primary" routerLink="add-user">
            Añadir nuevo usuario
          </button>
        </app-custom-empty-state>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEmptyStateComponent {
  emptyEstate = {
    title: 'No se han encontrado usuarios',
    description: 'Puedes añadir nuevos usuarios a continuación.',
  };

  //   constructor() {}

  //   ngOnInit(): void {}
}
