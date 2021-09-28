import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  HostListener,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Confirmation } from '@smec-monorepo/shared/models';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-confirmation-dialog',
  template: `
    <div class="dialog-header">
      <h2 mat-dialog-title>{{ data.title }}</h2>
      <!-- <button mat-icon-button [mat-dialog-close]="false">
        <mat-icon>close</mat-icon>
      </button> -->
    </div>

    <div mat-dialog-content>
      {{ data.message }}
    </div>

    <div mat-dialog-actions [align]="'end'">
      <button mat-button style="margin-right: 10px" (click)="cancel()">
        {{ data.cancelText }}
      </button>
      <button class="btn" mat-button color="primary" (click)="confirm()">
        {{ data.confirmText }}
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Confirmation,
    private mdDialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {}

  cancel() {
    this.close(false);
  }

  close(value: boolean) {
    this.mdDialogRef.close(value);
  }

  confirm() {
    this.close(true);
  }

  @HostListener('keydown.esc')
  public onEsc() {
    this.close(false);
  }
}
