import { Unit } from "./unit.model";

export interface Sensor {
  sensorId: number;
  name: string;
  unit: Unit;
}
