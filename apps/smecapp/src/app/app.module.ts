import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('@smec-monorepo/smecapp/feature-item').then(
              (module) => module.SmecappFeatureItemModule
            ),
        },
      ],
      { initialNavigation: 'enabled', relativeLinkResolution: 'legacy' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
