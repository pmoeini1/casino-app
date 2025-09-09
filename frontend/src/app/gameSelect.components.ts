import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-game-select',
  templateUrl: './gameSelect.component.html',
  standalone: true
})
export class GameSelect {
    constructor(private router: Router) {} 
    toSlot(){
        this.router.navigate(['/slot']);
    }
    toBlackjack(){
        this.router.navigate(['/blackjack']);

    }
    toRoulette(){
        this.router.navigate(['/roulette']);
    }
    toPoker(){
        this.router.navigate(['/poker']);
    }
}