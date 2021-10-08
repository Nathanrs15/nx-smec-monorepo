import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    AfterViewInit,
    OnDestroy,
    Input,
    Inject,
    PLATFORM_ID,
    NgZone,
} from '@angular/core';

import * as am4charts from '@amcharts/amcharts4/charts';
import { isPlatformBrowser } from '@angular/common';
import { ChartConfiguration } from '@smec-monorepo/shared';
import { ChartData, TimeBasedGraphService } from '../../data-access';

@Component({
    selector: 'time-based-graph',
    template: ` <div [id]="id" class="graph-container"></div> `,
    styles: [
        `
            .graph-container {
                width: 100%;
                height: 100%;
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeBasedGraphComponent
    implements /* OnInit,*/ AfterViewInit, OnDestroy
{
    private chart!: am4charts.XYChart;

    @Input() id!: string;
    @Input() chartConf: ChartConfiguration;
    @Input() chartData: ChartData[];

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private zone: NgZone,
        private graphService: TimeBasedGraphService
    ) {}

    // Run the function only in the browser
    browserOnly(f: () => void) {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                f();
            });
        }
    }

    // ngOnInit(): void {
    // }

    loadGraph() {
        console.log('loadGraph');

        this.browserOnly(() => {
            if (this.chart) {
                this.chart.dispose();
            }
            this.chart = this.graphService.loadConfiguration(
                this.id,
                this.chartData,
                this.chartConf
            );
        });
    }

    ngAfterViewInit() {
        this.loadGraph();
    }

    ngOnDestroy() {
        // Clean up chart when the component is removed
        this.browserOnly(() => {
            if (this.chart) {
                this.chart.dispose();
            }
        });
    }
}
