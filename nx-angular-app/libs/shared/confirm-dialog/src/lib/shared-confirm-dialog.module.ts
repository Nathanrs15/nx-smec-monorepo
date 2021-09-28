import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmationDialogComponent } from './components';
// import { ConfirmDialogService } from '..';

const COMPONENTS = [ConfirmationDialogComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule],
  // providers: [ConfirmDialogService],
})
export class SharedConfirmDialogModule {}
