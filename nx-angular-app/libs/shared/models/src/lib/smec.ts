export interface Focus {
  focusId: number;
  focusCode: string;
  name: string;
  description: string;
  inService: boolean;
  analyzers: Analyzer[];
}

export interface Analyzer {
  analyzerId: number;
  focusId: number;
  model: string;
  manufacturer: string;
  serialNumber: string;
  sensors: Sensor[];
  focus: Focus;
}

export interface Sensor {
  sensorId: number;
  analyzerId: number;
  measuringComponentId: number;
  unitId: number;
  analyzer: Analyzer;
  measuringComponent: MeasuringComponent;
  unit: Unit;
}

export interface MeasuringComponent {
  measuringComponentId: number;
  name: string;
}

export interface Unit {
  unitId: number;
  name: string;
}
