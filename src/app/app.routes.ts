import { Routes } from '@angular/router';
import {HomeComponent} from "./public/components/home/home.component";

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {path: 'home', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
];
