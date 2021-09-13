import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'app',
    children: [
      {
        path: 'users-list',
        loadChildren: () =>
          import('@smec-monorepo/users/shell-web').then(
            (m) => m.UsersShellWebModule
          ),
      },
      {
        path: 'user-detail',
        loadChildren: () =>
          import('@smec-monorepo/users/shell-web').then(
            (m) => m.UsersShellWebModule
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'app/users-list', pathMatch: 'full' },
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
