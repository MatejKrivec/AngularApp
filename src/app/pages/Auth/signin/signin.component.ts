import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  formData = {
    username: '',
    password: ''
  };

  constructor(private router: Router) { }

  async onSubmit() {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.formData),
      });

      if (!response.ok) {
        throw new Error('Failed to log in');
      }

      const { token } = await response.json();
      localStorage.setItem('token', token);

      try {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        };

        const protectedResponse = await fetch('http://localhost:3000/auth/protected', {
          headers
        });

        if (!protectedResponse.ok) {
          throw new Error('Unauthorized');
        }

        const responseData = await protectedResponse.json();
        this.router.navigate([`/${responseData.route}`]);

      } catch (error) {
        console.error('Error authenticating:', error);
        // Handle error (toast or alert)
      }

    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error (toast or alert)
    }
  }
}
