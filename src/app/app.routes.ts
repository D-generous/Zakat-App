import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalculateZakatComponent } from './calculate-zakat/calculate-zakat.component';


export const routes: Routes = [
{path: 'dashboard', component:DashboardComponent},
{path: 'calculate', component:CalculateZakatComponent}

];
