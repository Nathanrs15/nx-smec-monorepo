/* eslint-disable @typescript-eslint/prefer-for-of */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    ChartConfiguration,
    Sensor,
    SensorService,
    Serie,
} from '@shared/data-access';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TimeBasedGraphService } from './time-based-graph.service';
import { ChartData, DataRecord, DataRecordService } from '.';
import { map, tap } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable()
export class ChartService {
    private baseUrl = environment.baseUrl;

    constructor(
        private http: HttpClient,
        private timeBasedChart: TimeBasedGraphService,
        private sensorService: SensorService,
        private dataRecordService: DataRecordService
    ) {}

    /** API CALLS */
    getCharts(): Observable<ChartConfiguration[]> {
        return this.http.get<ChartConfiguration[]>(`${this.baseUrl}/charts`);
    }

    getChartById(chartId: number): Observable<ChartConfiguration> {
        return this.http.get<ChartConfiguration>(
            `${this.baseUrl}/charts/${chartId}`
        );
    }

    getAllSensors(): Observable<Sensor[]> {
        return this.sensorService.getSensors();
    }

    getSeriesDataRecords(
        sensorId: number,
        from: string,
        to: string
    ): Observable<DataRecord[]> {
        return this.dataRecordService.getDataRecords(sensorId, from, to);
    }
    /** CHART HANDLE */

    setChartDataSource(data: any[]): void {
        this.timeBasedChart.setChartDataSource(data);
    }

    getChartSeries(): Observable<string[]> {
        return this.timeBasedChart.series$;
    }

    formatChartDataRecords(
        series: Serie[],
        records: DataRecord[]
    ): ChartData[] {
        const data: ChartData[] = [];
        for (let index = 0; index < records.length; index++) {
            const record = records[index];
            const obj: ChartData = {};
            obj.date = record.timestamp;
            for (let j = 0; j < series.length; j++) {
                const s = series[j];
                obj[s.name] = record.averageValue;
            }
            data.push(obj);
        }
        return data;
    }
}
