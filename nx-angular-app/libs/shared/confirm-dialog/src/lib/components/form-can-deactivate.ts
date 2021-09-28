import { FormGroup, NgForm } from '@angular/forms';
import { ComponentCanDeactivate } from './component-can-deactivate';

export abstract class FormCanDeactivate extends ComponentCanDeactivate {
  abstract get form(): NgForm;

  abstract get isAddMode(): boolean;
  abstract get formGroup(): FormGroup;
  abstract get formInitialValue(): any;

  private afterAddUrl = '../';
  private afterEditUrl = '../../';

  public returnUrl() {
    return this.isAddMode ? this.afterAddUrl : this.afterEditUrl;
  }

  public restartForm(name: string) {
    const control = this.formGroup.get(name);
    control?.reset(this.isAddMode ? '' : this.formInitialValue[name]);
  }

  canDeactivate(): boolean {
    return this.form.submitted || !this.form.dirty;
  }
}
