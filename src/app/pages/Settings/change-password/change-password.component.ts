import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  @Output() cancelClick: EventEmitter<void> = new EventEmitter<void>();
  changePasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  handleCancel(): void {
    console.log('Password change canceled');
    this.cancelClick.emit();
  }

  handleSubmit(): void {
    if (this.changePasswordForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const formData = this.changePasswordForm.value;
    const userId = localStorage.getItem('UserId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      console.error('User ID or token not found');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    // Example of submitting using fetch
    fetch(`http://localhost:3000/users/validatePassword/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ currentPassword: formData.currentPassword }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to validate current password');
      }
      return response.text();
    })
    .then(isPasswordValid => {
      if (isPasswordValid === 'false') {
        throw new Error('Invalid current password');
      }

      const updatedPasswordData = {
        password: formData.newPassword
      };

      return fetch(`http://localhost:3000/users/posodobitev/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedPasswordData),
      });
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update password');
      }
      console.log('Password updated successfully');
      this.handleCancel(); // Optionally navigate away or close modal
      
    })
    .catch(error => {
      console.error('Error updating password:', error);
      // Handle error (toast or alert)
    });
  }

}
