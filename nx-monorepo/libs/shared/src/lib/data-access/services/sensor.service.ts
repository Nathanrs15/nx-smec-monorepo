import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, environment } from '@smec-monorepo/shared';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SensorService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getSensors(): Observable<Chart[]> {
    return this.http.get<Chart[]>(`${this.baseUrl}/sensors`);
  }

  getSensorById(sensorId: number): Observable<Chart[]> {
    return this.http.get<Chart[]>(`${this.baseUrl}/sensors/${sensorId}`);
  }
}
