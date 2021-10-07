import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, environment, Serie } from '@smec-monorepo/shared';
import { combineLatest, Observable } from 'rxjs';
import { TimeBasedGraphService } from './time-based-graph.service';
import { delay } from 'rxjs/operators';

@Injectable()
export class ChartService {
  private baseUrl = environment.baseUrl;
  _series: string[] = []; // 'CO', 'HCI', 'SO2'

  constructor(
    private http: HttpClient,
    private timeBasedChart: TimeBasedGraphService
  ) {}

  /** API CALLS */
  getCharts(): Observable<Chart[]> {
    return this.http.get<Chart[]>(`${this.baseUrl}/charts`);
  }

  getChartById(chartId: number): Observable<Chart> {
    return this.http.get<Chart>(`${this.baseUrl}/charts/${chartId}`);
  }

  /** CHART HANDLE */

  setChartDataSource(data: any[]) {
    this.timeBasedChart.setChartDataSource(data);
  }

  setSeriesSoruce(sensorName: string) {
    // this._series.push(sensorName);
    // this.timeBasedChart.setSeriesSoruce(this._series);
    // this.generatechartData();
  }

  getChartSeries() {
    return this.timeBasedChart.series$;
  }

  generatechartData(series: Serie[]) {
    let value = 50;
    const data = [];

    const dates = this.generate_dates(30);

    for (let i = 0; i < dates.length; i++) {
      const obj: CHARTDATA = {};
      obj.date = dates[i];
      for (let j = 0; j < series.length; j++) {
        const _serie = series[j];
        value += Math.round(
          (Math.random() < 0.5 ? -1 : 1) * Math.random() * 10
        );

        obj[_serie.name] = value;
      }
      data.push(obj);
    }

    return data;
  }

  deleteFromSeriesSource(serie: string) {
    const index = this._series.indexOf(serie);

    if (index >= 0) {
      this._series.splice(index, 1);
    }

    this.timeBasedChart.setSeriesSoruce(this._series);
    // this.generatechartData();
  }

  clearAllSeries() {
    this._series = [];
    this.timeBasedChart.setSeriesSoruce(this._series);
    // this.generatechartData();
  }

  generate_dates(step: number) {
    const dt = new Date();
    const date = dt.getDate();

    dt.setHours(0, 0, 0);

    const rc = [];

    while (dt.getDate() === date) {
      rc.push(new Date(dt));
      dt.setMinutes(dt.getMinutes() + step);
    }
    return rc;
  }
}

export interface CHARTDATA {
  date?: any;
  [key: string]: any;
}
