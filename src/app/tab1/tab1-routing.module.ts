import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SunsignComponent } from './sunsign/sunsign.component';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'sign',
    component: SunsignComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
