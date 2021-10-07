import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Chart } from '@smec-monorepo/shared';
import { Observable, Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ChartService } from '../../../data-access';

@Component({
  templateUrl: `./graph.component.html`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphPage implements OnInit {
  ngUnsubscribe = new Subject<void>();

  chartId = 'historical-chart';
  chartData: Chart;
  chartValues: any[];

  chart$: Observable<Chart>;

  drawerMode: 'over' | 'side' = 'side';
  drawerOpened = true;

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.chart$ = this.chartService.getChartById(1).pipe(
      take(1),
      tap((data) => {
        this.chartData = data;
        this.chartValues = this.chartService.generatechartData(data.series);
      })
    );
  }

  addSerie(sensor: string) {
    if (!sensor) return;
    this.chartService.setSeriesSoruce(sensor);
  }

  deleteSerie(serie: string) {
    this.chartService.deleteFromSeriesSource(serie);
  }

  clearAllSeries() {
    this.chartService.clearAllSeries();
  }
}
