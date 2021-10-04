import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiStateService {
  private UIState = new BehaviorSubject<UIStatus>(UIStatus.notInit);
  readonly UIState$ = this.UIState.asObservable();

  // constructor() {}

  initializeUIState() {
    this.UIState.next(UIStatus.loading);
  }

  updateUIState(data: any[]) {
    if (!data) return;

    const UIState = this.UIState.getValue();

    if (data.length) {
      this.UIState.next(UIStatus.loaded);
    } else if (UIState > UIStatus.notInit) {
      this.UIState.next(UIStatus.empty);
    }
  }
}

export enum UIStatus {
  notInit = 1,
  loading = 2,
  loaded = 3,
  empty = 4,
  error = 5,
}
