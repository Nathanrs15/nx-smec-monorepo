import { Unit } from './unit.model';

export interface Sensor {
    sensorId: number;
    tag?: string;
    name: string;
    unit: Unit;
}
