import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-roulette',
    templateUrl: './roulette.component.html',
    standalone: true,
    imports: [CommonModule, FormsModule]
})
export class Roulette {
  constructor(private router: Router) {};
  numbers = Array.from({ length: 36 }, (_, i) => i + 1);
  message: string = 'Place your bet!';
  bet: number | 'red' | 'black' | null = null;
  isRed(num: number): boolean {
    const redNumbers = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
    return redNumbers.includes(num);
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
    } else if (this.bet === this.rouletteNumber) {
        this.message = `The ball landed on ${this.rouletteNumber}. You win!`;
    } else if (this.bet === 'red' && this.isRed(this.rouletteNumber)) {
        this.message = `The ball landed on ${this.rouletteNumber} (Red). You win!`;
    } else if (this.bet === 'black' && !this.isRed(this.rouletteNumber)) {
        this.message = `The ball landed on ${this.rouletteNumber} (Black). You win!`;
    } else {
        this.message = `The ball landed on ${this.rouletteNumber}. You lose!`;
    }
  }

  back() {
    this.router.navigate(['/gameSelect']);
  }
}