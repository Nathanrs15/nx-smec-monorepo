import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailPage, MainPage, RouterPage } from './pages';

const routes: Routes = [
  {
    path: '',
    component: RouterPage,
    children: [
      {
        path: '',
        component: MainPage,
      },
      {
        path: 'item/:itemId',
        component: DetailPage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmecappFeatureItemRoutingModule {}
