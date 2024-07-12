import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-email-username',
  templateUrl: './change-email-username.component.html',
  styleUrls: ['./change-email-username.component.css']
})
export class ChangeEmailUsernameComponent implements OnInit {

  @Output() cancelClick = new EventEmitter<void>();
  
  showChangePassword = false;
  showChangeProfilePic = false;
  parentVisible = true;

  // Define userData object with initial properties
  userData = {
    firstName: '',
    lastName: '',
    email: ''
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getUserData(); // Fetch user data when component initializes
  }

  getUserData(): void {
    const userId = localStorage.getItem('UserId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      console.error('User ID or token not found');
      return;
    }

    fetch(`http://localhost:3000/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      return response.json();
    })
    .then(userData => {
      const [firstName, lastName] = userData.username.split(' ');
      this.userData.firstName = firstName || '';
      this.userData.lastName = lastName || '';
      this.userData.email = userData.email || '';
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      // Handle error (toast or alert)
    });
  }

  handleSave(): void {
    console.log('Profile settings saved');
    this.router.navigate(['/home']);
  }

  handleCancel(): void {
    console.log('Changes canceled');
    this.cancelClick.emit();
  }

  handleChangePasswordClick(): void {
    console.log('Change password clicked');
    this.showChangePassword = true;
    this.parentVisible = false;
  }

  handleChangeProfilePicClick(): void {
    console.log('Change profile picture clicked');
    this.showChangeProfilePic = true;
    this.parentVisible = false;
  }

  handleCancelFromChild(): void {
    this.showChangePassword = false;
    this.showChangeProfilePic = false;
    this.parentVisible = true;
  }

  handleSubmit(updatedUserData: any): void {
    const userId = localStorage.getItem('UserId');
    const username = `${updatedUserData.firstName.trim()} ${updatedUserData.lastName.trim()}`;
    const updatedData = {
      username,
      email: updatedUserData.email,
    };

    const token = localStorage.getItem('token');

    fetch(`http://localhost:3000/users/posodobitev/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update user details');
      }
      return response.json();
    })
    .then(data => {
      console.log('User details updated successfully:', data);
      localStorage.setItem('USERNAME', username);
      this.handleCancel();
    })
    .catch(error => {
      console.error('Error updating user details:', error);
      // Handle error (toast or alert)
    });
  }
}
