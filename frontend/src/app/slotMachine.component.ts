import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-slot-machine',
  templateUrl: './slotMachine.component.html',
  standalone: true
})
export class SlotMachine {
    constructor(private router: Router) {}
}