import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataRecord } from '.';

@Injectable()
export class DataRecordService {
  private baseUrl = 'https://tersa.cemsview.com/api';
  constructor(private http: HttpClient) {}

  getDataRecords(sensorId: number, from: string, to: string): Observable<DataRecord[]> {
    return this.http.get<DataRecord[]>(`${this.baseUrl}/datarecords/${sensorId}?From=${from}&To=${to}`);
  }
}
