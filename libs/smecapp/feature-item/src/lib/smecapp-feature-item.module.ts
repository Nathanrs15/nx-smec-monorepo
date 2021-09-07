import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmecappFeatureItemRoutingModule } from './smecapp-feature-item-routing.module';
import { MainPage } from './pages';
import { DetailPage } from './pages/detail/detail.page';
import { RouterPage } from './pages/router/router.page';

const PAGES = [MainPage, DetailPage, RouterPage];

@NgModule({
  declarations: [...PAGES],
  imports: [CommonModule, SmecappFeatureItemRoutingModule],
})
export class SmecappFeatureItemModule {}
