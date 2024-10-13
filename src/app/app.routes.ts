import { Routes } from '@angular/router';
import { BasicCarsComponent } from '@modules/basic-cars/pages/basic-cars/basic-cars.component';
import { PremiumCarsComponent } from '@modules/premium-cars/pages/premium-cars/premium-cars.component';
import { SpecialCarsComponent } from '@modules/special-cars/pages/special-cars/special-cars.component';
import { HomeComponent } from './home/page/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'basic-cars', component: BasicCarsComponent },
  { path: 'special-cars', component: SpecialCarsComponent },
  { path: 'premium-cars', component: PremiumCarsComponent },
  { path: '**', redirectTo: '/home' },
];
