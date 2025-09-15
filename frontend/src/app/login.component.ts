import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmailStateModel } from './state/email.state';
import { EmailState } from './state/email.state';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  private store = inject(Store); 
  count$: Observable<string> = this.store.select(
          (state: { email: EmailStateModel }) => state.email.email
      );
  

  constructor(private router: Router) {}

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }


  onSubmit() {
    if (!this.isValidEmail(this.email.trim())) {
      alert('Invalid email format');
      return;
    }
    const body = {
      email: this.email,
      password: this.password
    }
    axios.post('http://localhost:5000/login', body)
      .then(response => {
        console.log('Login successful:', response.data);
        this.store.dispatch(new (require('./state/email.action').SetEmail)(this.email));
        this.router.navigate(['/gameSelect']);
      })
      .catch(error => {
        alert('Error during login');
      });
    
  }
}