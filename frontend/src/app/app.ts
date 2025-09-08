import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true, 
})
export class App {
  email: string = '';
  password: string = '';
  protected readonly title = signal('frontend');
  onSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }
}
