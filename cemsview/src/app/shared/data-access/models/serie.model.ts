import { Sensor } from './sensor.model';

export interface Serie {
    serieId: number;
    sensorId: number;
    name: string;
    sensor: Sensor;
}
