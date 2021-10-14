/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    ChangeDetectorRef,
    EventEmitter,
    Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChartConfiguration, Serie } from '@shared/data-access';
import { take } from 'rxjs/operators';
import { ChartService } from '../../../data-access';

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

    @Output() formValues = new EventEmitter();

    filtersForm: FormGroup;

    charts: ChartConfiguration[] = [];

    series: Serie[] = [];

    constructor(
        private _formBuilder: FormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        private _chartService: ChartService
    ) {}

    ngOnInit(): void {
        this.filtersForm = this._formBuilder.group({
            twoStep: [true],
            askPasswordChange: [false],
            start: '',
            end: '',
            chart: '',
            series: [],
        });

        this._chartService
            .getCharts()
            .pipe(take(1))
            .subscribe((charts) => {
                this.charts = charts;

                const chart = this.charts.find((x) => (x.chartId = 1));
                this.setSeries(chart);

                this.filtersForm.get('start').setValue('2021-10-05');
                this.filtersForm.get('end').setValue('2021-10-07');
                this.filtersForm.get('chart').setValue(chart);
                this.filtersForm.get('series').setValue([chart.series[0]]);

                this.onSubmitForm();
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    setSeries(chart: ChartConfiguration) {
        console.log(chart);
        this.series = chart.series;
        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    onSubmitForm() {
        const range = {
            start: this.filtersForm.get('start').value,
            end: this.filtersForm.get('end').value,
        };

        const chart = this.filtersForm.get('chart').value;

        const series = this.filtersForm.get('series').value;

        const results = { range, chart, series };

        console.log(results);

        this.formValues.emit(results);
    }
}
