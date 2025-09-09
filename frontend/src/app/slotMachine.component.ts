import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-slot-machine',
  templateUrl: './slotMachine.component.html',
  standalone: true
})
export class SlotMachine {
    constructor(private router: Router) {}
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
        } else {
        this.result = '😢 You lose!';
        }
    }
    back() {
        this.router.navigate(['/gameSelect']);
    }
}