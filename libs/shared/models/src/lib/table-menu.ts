// import { Actions } from '@shared/enums';

export interface TableMenu {
  name: string;
  icon: string;
  // action: Actions;
}

export interface SelectedAction<T> {
  // action: Actions;
  data: T;
}
