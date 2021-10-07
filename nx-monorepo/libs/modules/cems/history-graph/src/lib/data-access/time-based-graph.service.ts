import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4lang_es_ES from '@amcharts/amcharts4/lang/es_ES';

import am4themes_material from '@amcharts/amcharts4/themes/material';
import { Chart, Serie } from '@smec-monorepo/shared';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';
// import am4themes_dark from '@amcharts/amcharts4/themes/dark';
// import am4themes_dataviz from '@amcharts/amcharts4/themes/dataviz';

@Injectable()
export class TimeBasedGraphService {
  private chartDataSource$ = new BehaviorSubject<any[]>([]);
  chartData$ = this.chartDataSource$.asObservable().pipe();

  private seriesSource$ = new BehaviorSubject<string[]>([]);
  series$ = this.seriesSource$.asObservable();

  //

  loadConfiguration(id: string, values: any[], data: Chart): am4charts.XYChart {
    console.log(data);


    am4core.useTheme(am4themes_material);

    const container = am4core.create(id, am4core.Container);
    container.layout = 'grid';
    container.fixedWidthGrid = false;
    container.width = am4core.percent(100);
    container.height = am4core.percent(100);

    const chart: am4charts.XYChart = container.createChild(am4charts.XYChart);

    // chart.padding(20, 5, 2, 5);
    chart.paddingRight = 0;
    chart.paddingLeft = 0;
    chart.paddingTop = 0;
    chart.paddingBottom = 0;

    chart.colors.step = 3;
    chart.invalidateData();
    chart.nonScalingStroke = true;
    chart.language.locale = am4lang_es_ES;
    chart.data = values;

    chart.dateFormatter.inputDateFormat = 'MM/dd/yyyy HH:mm:s';
    chart.numberFormatter.numberFormat = '#.00';

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    // dateAxis.periodChangeDateFormats.setKey('hour', '[bold]HH:mm a');
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.tooltipDateFormat = 'HH:mm, d MMMM';
    dateAxis.dataFields.date = 'date';
    dateAxis.baseInterval = {
      timeUnit: 'minute',
      count: data.count,
    };

    dateAxis.renderer.grid.template.disabled = true;
    dateAxis.renderer.labels.template.fontSize = 10;
    dateAxis.renderer.labels.template.location = 0.5;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    valueAxis.renderer.labels.template.fontSize = 10;
    valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.renderer.labels.template.disabled = true;
    // valueAxis.min = 0;

    data.series.map((s: Serie) => {
      console.log(s);

      const serie = chart.series.push(new am4charts.LineSeries());
      serie.dataFields.valueY = s.name;
      serie.dataFields.dateX = 'date';
      serie.legendSettings.labelText = s.name;
      serie.name = s.name;
      serie.tooltipText = `${s.name}: {valueY}`;
      if (serie.tooltip) serie.tooltip.pointerOrientation = 'vertical';

      serie.yAxis = valueAxis;
      serie.tensionX = 0.9;
      serie.strokeWidth = 2;
    });

    chart.invalidateData();

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineY.disabled = true;
    chart.cursor.behavior = 'none';

    // chart.legend = new am4charts.Legend();

    // chart.scrollbarX = new am4core.Scrollbar();

    // const title = chart.titles.create();
    // title.text = graph_title;
    // title.fontSize = 20;
    // title.tooltipText = toolTip;

    return chart;
  }

  setChartDataSource(data: any[]) {
    this.chartDataSource$.next(data);
  }

  setSeriesSoruce(series: string[]) {
    this.seriesSource$.next(series);
  }
}
