import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CounterStateModel } from './state/counter.state';
import { Increment, Decrement } from './state/counter.actions';


@Component({
    selector: 'app-roulette',
    templateUrl: './roulette.component.html',
    standalone: true,
    imports: [CommonModule, FormsModule, AsyncPipe]
})
export class Roulette {
    private store = inject(Store); 
    private router = inject(Router); 
    count$: Observable<number> = this.store.select(
        (state: { counter: CounterStateModel }) => state.counter.count
    );
    message: string = 'Place your bet!';
  bet: number | 'red' | 'black' | null = null;
  wager: number = 1;
  isRed(num: number): boolean {
    const redNumbers = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
    return redNumbers.includes(num);
  }
  setWager(amount: number) {
    if (amount > 0 && amount <= (this.store.selectSnapshot((state: { counter: CounterStateModel }) => state.counter.count))) {
        this.wager = amount;
        this.message = `Wager set to ${this.wager}. Now place your bet!`;
    } else {
        this.message = 'Invalid wager amount!';
    }
    }
  rouletteNumber: number | null = null;
  spinRoulette() {
    if (!this.bet) {
        this.message = 'Please place a bet first!';
        return;
    }
    this.rouletteNumber = Math.floor(Math.random() * 36); 
    if (this.rouletteNumber === 0) {
        this.message = 'The ball landed on 0. House wins!';
        this.store.dispatch(new Decrement(1*this.wager));
        
    } else if (this.bet === this.rouletteNumber) {
        this.message = `The ball landed on ${this.rouletteNumber}. You win!`;
        this.store.dispatch(new Increment(35*this.wager));
    } else if (this.bet === 'red' && this.isRed(this.rouletteNumber)) {
        this.message = `The ball landed on ${this.rouletteNumber} (Red). You win!`;
        this.store.dispatch(new Increment(2*this.wager));
    } else if (this.bet === 'black' && !this.isRed(this.rouletteNumber)) {
        this.message = `The ball landed on ${this.rouletteNumber} (Black). You win!`;
        this.store.dispatch(new Increment(2*this.wager));
    } else {
        this.message = `The ball landed on ${this.rouletteNumber}. You lose!`;
        this.store.dispatch(new Decrement(1*this.wager));
    }
  }

  back() {
    this.router.navigate(['/gameSelect']);
  }
}