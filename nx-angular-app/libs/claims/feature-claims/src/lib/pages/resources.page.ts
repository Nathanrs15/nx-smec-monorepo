import { Component, OnInit } from '@angular/core';
import { Resource } from '@smec-monorepo/shared/models';
import { Observable } from 'rxjs';
import { ResourcesFeatureService } from '@smec-monorepo/claims/data-access';

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
