import { Routes } from '@angular/router';
import { AuthComponent } from '@auth/page/auth.component';
import { BasicCarComponent } from '@modules/basic-cars/pages/basic-car/basic-car.component';
import { BasicCarsComponent } from '@modules/basic-cars/pages/basic-cars/basic-cars.component';
import { PremiumCarsComponent } from '@modules/premium-cars/pages/premium-cars/premium-cars.component';
import { SearchComponent } from '@modules/search/page/search.component';
import { SpecialCarsComponent } from '@modules/special-cars/pages/special-cars/special-cars.component';
import { HomeComponent } from './home/page/home/home.component';
import { AboutComponent } from './info/about/about.component';
import { ContactComponent } from './info/contact/contact.component';
import { PoliciesComponent } from './info/policies/policies.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'about', component: AboutComponent },
  { path: 'basic-cars', component: BasicCarsComponent },
  { path: 'basic-cars/:id', component: BasicCarComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'special-cars', component: SpecialCarsComponent },
  { path: 'policies', component: PoliciesComponent },
  { path: 'premium-cars', component: PremiumCarsComponent },
  { path: 'search/:searchType/:query', component: SearchComponent },
  { path: '**', redirectTo: '/home' },
];
