import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
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

  constructor(private router: Router) {}

  onSubmit() {
    const body = {
      email: this.email,
      password: this.password
    }
    axios.post('http://localhost:5000/login', body)
      .then(response => {
        console.log('Login successful:', response.data);
        this.router.navigate(['/gameSelect']);
      })
      .catch(error => {
        alert('Error during login');
      });
    
  }
}