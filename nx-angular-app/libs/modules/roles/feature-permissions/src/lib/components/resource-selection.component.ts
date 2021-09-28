import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Resource } from '@smec-monorepo/modules-roles-data-acess';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-resource-selection',
  template: `
    <mat-form-field appearance="outline">
      <mat-label>Elige un recurso</mat-label>
      <mat-select [value]="'Users'">
        <mat-option
          *ngFor="let resource of resources; trackBy: trackByFn"
          [routerLink]="['./', resource.name]"
          [value]="resource.name"
          >{{ resource.description }}</mat-option
        >
      </mat-select>
    </mat-form-field>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceSelectionComponent /*implements OnInit*/ {
  @Input() resources: Resource[] = [];
  // constructor() {}

  // ngOnInit(): void {}

  trackByFn(index: number, item: any) {
    return index;
  }
}
