import { Component, OnInit } from '@angular/core';
import { Resource } from '@smec-monorepo/modules-claims-data-access';
import { Observable } from 'rxjs';
import { ResourcesFeatureService } from '@smec-monorepo/modules-claims-data-access';

@Component({
  template: `
    <ng-container *ngIf="resources$ | async as resources">
      <app-resources-list [resources]="resources"></app-resources-list>
    </ng-container>
  `,
  styles: [],
})
export class ResourcesPage {
  resources$: Observable<Resource[]> = this.resourcesService.getResources();

  constructor(private resourcesService: ResourcesFeatureService) {}

  // ngOnInit(): void {}
}
