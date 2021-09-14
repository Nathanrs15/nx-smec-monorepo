import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UtilsService } from '@smec-monorepo/shared/utils';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-change-theme',
  template: `
    <!-- <mat-card> -->
    <mat-card-header>
      <mat-card-title> Temas </mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <div fxLayout="row">
        <div fxFlex="50">
          <form class="custom-form">
            <mat-form-field appearance="outline" color="accent">
              <mat-label>Seleccionar tema</mat-label>
              <mat-select [value]="defaultTheme">
                <mat-option
                  *ngFor="let t of themes"
                  [value]="t.value"
                  (click)="onSelectTheme(t)"
                >
                  {{ t.label }}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </form>
        </div>
        <div fxFlex="50">
          <app-undraw-settings
            fxLayoutAlign="start center"
            [width]="550"
            [height]="550"
          ></app-undraw-settings>
        </div>
      </div>
    </mat-card-content>
    <!-- </mat-card> -->
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeThemeComponent {
  themes = [
    { value: 'default-theme', type: 'lightMode', label: 'Indigo light' },
    // { value: 'light-theme', type: 'lightMode', label: 'Ligh' },
    { value: 'nature-theme', type: 'lightMode', label: 'Nature' },
    // { value: 'black-theme', type: 'darkMode', label: 'Dark black' },
    // { value: 'orange-dark-theme', type: 'darkMode', label: 'Dark orange' },
    { value: 'orange-light-theme', type: 'lightMode', label: 'Light orange' },
  ];

  constructor(private service: UtilsService) {}
  storedTheme = localStorage.getItem('theme');

  defaultTheme = this.storedTheme ? this.storedTheme : 'orange-dark-theme';

  // ngOnInit(): void {}

  onSelectTheme(theme: any) {
    this.service.setTheme(theme);
  }
}
