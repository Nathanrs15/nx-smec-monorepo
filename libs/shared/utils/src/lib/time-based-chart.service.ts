import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class TimeBasedChartService {
  private chartDataSource$ = new BehaviorSubject<any[]>([]);
  chartData$ = this.chartDataSource$.asObservable().pipe();

  private seriesSource$ = new BehaviorSubject<string[]>([]);
  series$ = this.seriesSource$.asObservable();

  private isDarkTheme$ = this.utilsService.isDarkMode$;

  dataSource$ = combineLatest([
    this.chartData$,
    this.series$,
    this.isDarkTheme$,
  ]).pipe(delay(500));

  constructor(private utilsService: UtilsService) {}

  setChartDataSource(data: any[]) {
    this.chartDataSource$.next(data);
  }

  setSeriesSoruce(series: string[]) {
    this.seriesSource$.next(series);
  }
}
