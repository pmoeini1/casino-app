import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { Increment, Decrement } from './state/counter.actions';
import { CounterStateModel } from './state/counter.state';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-slot-machine',
  templateUrl: './slotMachine.component.html',
  standalone: true,
  imports: [CommonModule, AsyncPipe]
})
export class SlotMachine {
  private store = inject(Store); 
  private router = inject(Router); 

  count$: Observable<number> = this.store.select(
    (state: { counter: CounterStateModel }) => state.counter.count
  );

  slot1: number = 0;
  slot2: number = 0;
  slot3: number = 0;
  result: string = '';

  spin() {
    this.slot1 = Math.floor(Math.random() * 9) + 1;
    this.slot2 = Math.floor(Math.random() * 9) + 1;
    this.slot3 = Math.floor(Math.random() * 9) + 1;

    if (this.slot1 === this.slot2 && this.slot2 === this.slot3) {
      this.result = '🎉 You win!';
      this.store.dispatch(new Increment(99));
    } else {
      this.result = '😢 You lose!';
      this.store.dispatch(new Decrement(1));
    }
  }

  back() {
    this.router.navigate(['/gameSelect']);
  }
}