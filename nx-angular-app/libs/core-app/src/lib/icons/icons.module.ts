import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@NgModule()
export class IconsModule {
  private logoUrl = 'assets/logos/logo_sige.svg';

  constructor(
    private _domSanitizer: DomSanitizer,
    private _matIconRegistry: MatIconRegistry
  ) {
    this._matIconRegistry.addSvgIcon(
      'logo-sige',
      this._domSanitizer.bypassSecurityTrustResourceUrl(this.logoUrl)
    );
  }
}
