import { ModuleWithProviders } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import { BarListComponent} from './bar-list/bar-list.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
  path: 'bars',
  component: BarListComponent
}

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
