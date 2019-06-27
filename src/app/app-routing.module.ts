import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarsComponent } from './bars/bars.component';

const routes: Routes = [
  { path: 'bars', component: BarsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
