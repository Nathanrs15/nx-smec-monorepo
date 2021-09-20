import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GridBreakpointService {
  private source = window.innerWidth <= 1500 ? true : false;
  private breakpointSource = new BehaviorSubject<boolean>(this.source);
  breakpoint$ = this.breakpointSource.asObservable();

  private mobile = window.innerWidth <= 960 ? true : false;
  private mobileSource = new BehaviorSubject<boolean>(this.mobile);
  mobileBreakpoint$ = this.mobileSource.asObservable();

  constructor() {}

  onResize(event: any) {
    const source = event.target.innerWidth <= 1500 ? true : false;
    const mobile = event.target.innerWidth <= 960 ? true : false;
    this.breakpointSource.next(source);
    this.mobileSource.next(mobile);
  }
}
