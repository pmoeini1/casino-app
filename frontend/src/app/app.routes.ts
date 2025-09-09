import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { GameSelect } from './gameSelect.components';
import { SlotMachine } from './slotMachine.component';
import { Roulette } from './roulette.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'gameSelect', component: GameSelect },
  { path: 'slot', component: SlotMachine },
  { path: 'roulette', component: Roulette },
];