import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { ChartConfiguration } from '@shared/data-access';
import { Observable, Subject } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { ChartData, ChartService } from '../../../data-access';
import * as moment from 'moment';

@Component({
    templateUrl: `./graph.component.html`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphPage implements OnInit {
    ngUnsubscribe = new Subject<void>();

    chartId = 'historical-chart';
    chartConfig: ChartConfiguration;
    chartData: ChartData[];

    loadData$: Observable<any | any[]>;

    drawerMode: 'over' | 'side' = 'side';
    drawerOpened = true;

    constructor(private chartService: ChartService) {}

    ngOnInit(): void {
        // this.loadChartDataConfig();
    }

    loadChartDataConfig(data?) {
        const formatDate = (date) => moment(date).format('YYYY-MM-DD');

        if (!data?.range || !data.chart || !data.series) {
            return;
        }

        this.loadData$ = this.chartService
            .getChartById(data.chart.chartId)
            .pipe(
                take(1),
                switchMap((config) => {
                    this.chartConfig = config;
                    return this.chartService.getSeriesDataRecords(
                        data.series[0].sensor.sensorId,
                        formatDate(data.range.start),
                        formatDate(data.range.end)
                    );
                }),
                tap((records) => {
                    this.chartData = this.chartService.formatChartDataRecords(
                        this.chartConfig.series,
                        records
                    );
                })
            );
    }
}
