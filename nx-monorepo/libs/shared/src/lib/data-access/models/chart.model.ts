import { Serie } from "./serie.model";

export interface ChartConfiguration {
  chartId: number;
  name: string;
  description: string;
  timeUnit: string;
  count: number;
  series: Serie[];
}
