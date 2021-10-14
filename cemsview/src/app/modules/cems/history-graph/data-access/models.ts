export interface DataRecord {
    sensorId: number;
    timestamp: any;
    minValue: number;
    maxValue: number;
    averageValue: number;
    samples: number;
}

export interface ChartData {
    date?: any;
    // eslint-disable-next-line @typescript-eslint/member-ordering
    [key: string]: any;
}
