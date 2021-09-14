import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  private durationInSeconds = 5;
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    const panelTheme = localStorage.getItem('theme');

    // console.log('panel theme:', panelTheme);

    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: [panelTheme || ''],
    });
  }
}
