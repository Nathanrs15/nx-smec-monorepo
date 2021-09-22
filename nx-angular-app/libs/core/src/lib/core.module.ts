import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmationDialogComponent } from './components/confirmation-dialog.component';

const COMPONENTS = [ConfirmationDialogComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule],
})
export class CoreModule {}
