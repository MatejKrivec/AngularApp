import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  formData = {
    username: '',
    surname: '',
    email: '',
    password: '',
    repeatPassword: ''
  };

  defaultProfilePic: string = 'assets/images/DefaultProfilePic.png';

  constructor() { }

  generateImageKey(): string {
    return `User-ProfilePic-${Date.now()}`;
  }

  setImageToLocalStorage(): string {
    const key = this.generateImageKey();
    localStorage.setItem(key, this.defaultProfilePic);
    return key;
  }

  onSubmit() {
    if (this.formData.password !== this.formData.repeatPassword) {
      console.error('Passwords do not match');
      return;
    }

    const profilePictureKey = this.setImageToLocalStorage();

    const user = {
      username: `${this.formData.username} ${this.formData.surname}`,
      email: this.formData.email,
      password: this.formData.password,
      profilePicture: profilePictureKey
    };

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('User created successfully', data);
      window.location.href = '/signin'; // Redirect to sign in page
    })
    .catch(error => {
      console.error('Error creating user:', error);
    });
  }
}