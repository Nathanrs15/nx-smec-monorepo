import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { GridBreakpointService } from '@smec-monorepo/shared/utils';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-custom-empty-state',
  template: `
    <div fxFill fxLayout="column" fxLayoutAlign="space-evenly center">
      <app-undraw-empty-state
        [height]="(breakpoint$ | async) ? 300 : 500"
        [width]="(breakpoint$ | async) ? 300 : 500"
      ></app-undraw-empty-state>

      <h2>{{ title }}</h2>
      <p>{{ description }}</p>

      <ng-content></ng-content>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomEmptyStateComponent {
  @Input() title = '';
  @Input() description = '';

  breakpoint$ = this.gridService.breakpoint$;

  constructor(private gridService: GridBreakpointService) {}

}
