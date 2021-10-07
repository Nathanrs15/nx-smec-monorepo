export interface DataRecord {
  sensorId: number;
  timeStamp: Date;
  minValue: number;
  maxValue: number;
  samples: number;
}
