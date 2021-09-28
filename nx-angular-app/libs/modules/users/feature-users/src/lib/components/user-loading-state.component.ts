import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-user-loading-state',
  template: `
    <!-- Cargando ... -->
    <div class="wrapper">
      <div class="inner">
        <mat-spinner></mat-spinner>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserLoadingStateComponent {
  // constructor() {}
  // ngOnInit(): void {}
}
