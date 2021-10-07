import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ViewChild,
    TemplateRef,
    ElementRef,
    Renderer2,
    ViewContainerRef,
    ViewEncapsulation,
    ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'filters-drawer',
    templateUrl: './filters-drawer.component.html',
    styleUrls: ['./filters-drawer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersDrawerComponent implements OnInit {
    today = new Date();
    yesterday!: Date;

    @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
    @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;

    measuringComponents = [
        { id: 1, title: 'CO2' },
        { id: 2, title: 'SO2' },
        { id: 3, title: 'HCI' },
    ];

    filtersForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        const date = new Date();
        date.setDate(date.getDate() - 5);
        this.yesterday = date;

        this.filtersForm = this._formBuilder.group({
            twoStep: [true],
            askPasswordChange: [false],
            tags: [[]],
        });

        // Mark for check
        // this._changeDetectorRef.markForCheck();
    }
}
