import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Confirmation } from '@smec-monorepo/shared/models';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  // dialogRef!: MatDialogRef<ConfirmationDialogComponent>;

  constructor(private dialog: MatDialog) {}

  // public open(options: Confirmation) {
  //   this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     // height: '200px',
  //     width: '400px',
  //     disableClose: true,
  //     data: { ...options },
  //   });
  // }

  // public confirmed(): Observable<boolean> {
  //   return this.dialogRef.afterClosed().pipe(take(1));
  // }
}
