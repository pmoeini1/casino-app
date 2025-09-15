import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { EmailStateModel } from './state/email.state';
import { Store } from '@ngxs/store';
import { CounterStateModel } from './state/counter.state';
import { Observable } from 'rxjs';
import { EmailState } from './state/email.state';
import { inject } from '@angular/core';

@Component({
  selector: 'app-game-select',
  templateUrl: './gameSelect.component.html',
  standalone: true,
})
export class GameSelect {
    private store = inject(Store); 
    constructor(private router: Router) {} 
    cashOut(){
        const body = {
            email: this.store.selectSnapshot((state: { email: {email: string} }) => state.email.email),
            credits: this.store.selectSnapshot((state: { counter: { count: number } }) => state.counter.count)
        }
        /*
        axios.post('http://localhost:5000/setCredits', body)
        .then(response => {
            alert(`Cashed out: $${response.data.amount}`);            
        })
        .catch(error => {
            alert('Error during cash out');
        }); */
        this.router.navigate(['/']);
    }
    toSlot(){
        this.router.navigate(['/slot']);
    }
    toRoulette(){
        this.router.navigate(['/roulette']);
    }
    back() {
        this.router.navigate(['/']);
    }
}