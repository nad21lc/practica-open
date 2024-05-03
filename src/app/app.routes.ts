import { Routes } from '@angular/router';
import {HomeComponent} from "./public/components/home/home.component";
import {OfferTableComponent} from "./offer/components/offer-table/offer-table.component";

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {path: 'home', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},

  {path: 'business/offers', redirectTo: 'business/offers'},
  {path: 'business/offers', component: OfferTableComponent}
];
