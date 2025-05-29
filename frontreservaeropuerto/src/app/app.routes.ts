import { Routes } from '@angular/router';
import { ReservaComponent } from './component/reserva/reserva.component';

export const routes: Routes = [
  { path: '', component: ReservaComponent },
  { path: 'reserva', component: ReservaComponent }
];
