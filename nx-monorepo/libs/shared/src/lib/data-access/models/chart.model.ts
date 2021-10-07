import { Serie } from "./serie.model";

export interface Chart {
  chartId: number;
  name: string;
  description: string;
  timeUnit: string;
  count: number;
  series: Serie[];
}
