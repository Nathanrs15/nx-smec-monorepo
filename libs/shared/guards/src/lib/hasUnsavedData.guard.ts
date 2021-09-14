import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ComponentCanDeactivate } from '@smec-monorepo/shared/ui';
import { ConfirmDialogService } from '@smec-monorepo/shared/utils';
import { Confirmation } from '@smec-monorepo/shared/models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HasUnsavedDataGuard
  implements CanDeactivate<ComponentCanDeactivate>
{
  private options: Confirmation = {
    title: '¿Estás seguro?',
    message: 'Tienes algunos datos del formulario sin guardar',
    cancelText: 'Cancelar',
    confirmText: 'Continuar',
  };

  constructor(private dialogService: ConfirmDialogService) {}

  canDeactivate(
    component: ComponentCanDeactivate
  ): boolean | Observable<boolean> {
    if (!component.canDeactivate()) {
      this.dialogService.open(this.options);
      return this.dialogService.confirmed();
    }

    return true;
  }
}
