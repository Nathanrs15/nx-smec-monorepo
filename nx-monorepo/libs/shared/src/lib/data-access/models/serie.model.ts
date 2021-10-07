import { Sensor } from './sensor.model';

export interface Serie {
  serieId: number;
  name: string;
  sensor: Sensor;
}
