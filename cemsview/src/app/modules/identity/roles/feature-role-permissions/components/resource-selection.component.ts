/* eslint-disable @typescript-eslint/dot-notation */
import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Resource } from '../../data-access';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'app-resource-selection',
    template: `
        <div [matMenuTriggerFor]="projectsMenu">
            <div class="flex items-center">
                <div class="overflow-hidden">
                    <div class="font-medium leading-6 truncate">
                        {{ selectedResource }}
                    </div>
                </div>
                <div class="flex items-center justify-center pl-2">
                    <mat-icon
                        class="icon-size-5"
                        [svgIcon]="'heroicons_solid:chevron-down'"
                    ></mat-icon>
                </div>
            </div>
            <mat-menu #projectsMenu="matMenu" [xPosition]="'after'">
                <ng-container
                    *ngFor="let resource of resources; trackBy: trackByFn"
                >
                    <button
                        mat-menu-item
                        (click)="selectedResource = resource.name"
                        [routerLink]="['./', resource.name]"
                    >
                        {{ resource.description }}
                    </button>
                </ng-container>
            </mat-menu>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ResourceSelectionComponent implements OnInit {
    @Input() resources: Resource[] = [];

    selectedResource = '';

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        const resourceName = this.route.snapshot.params['type'];
        this.selectedResource = resourceName ? resourceName : 'Users';
    }

    trackByFn(index: number, item: any) {
        return index;
    }
}
