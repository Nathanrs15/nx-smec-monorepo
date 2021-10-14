import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sensor } from '../models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SensorService {
    private baseUrl = 'https://tersa.cemsview.com/api';

    constructor(private http: HttpClient) {}

    getSensors(): Observable<Sensor[]> {
        return this.http.get<Sensor[]>(`${this.baseUrl}/sensors`);
    }

    getSensorById(sensorId: number): Observable<Sensor[]> {
        return this.http.get<Sensor[]>(`${this.baseUrl}/sensors/${sensorId}`);
    }
}
