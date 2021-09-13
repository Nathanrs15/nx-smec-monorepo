import { Component, OnInit } from '@angular/core';

@Component({
  template: `<!-- <img class="wave" src="img/wave.png" /> -->
    <div class="container" fxLayout="row">
      <!-- right   -->
      <div class="right-container" fxFlex="60">
        <!-- logo sige -->
        <!-- <img class="logo-sige" [src]="logo" alt="" /> -->
      </div>

      <!-- left -->
      <!-- <div class="left-container" fxFlex="40"> -->
      <mat-card class="left-container" fxFlex="40" fxFill>
        <app-login-form></app-login-form>
      </mat-card>
      <!-- </div> -->
    </div> `,
  styleUrls: ['./pages-styles.scss'],
})
export class LoginPage {
  imageRoute = 'assets/undraw/all_data.svg';
  logo = 'assets/logos/logo_sige.svg';

  // constructor() {}

  // ngOnInit(): void {}
}
