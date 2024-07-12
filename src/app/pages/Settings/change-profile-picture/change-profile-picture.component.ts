import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-change-profile-picture',
  templateUrl: './change-profile-picture.component.html',
  styleUrls: ['./change-profile-picture.component.css']
})
export class ChangeProfilePictureComponent {

  profilePicture: string = ''; // Initialize profile picture
  imageKey: string = ''; // Initialize image key
  fileToUpload: File | null = null;

  @Output() cancelClick: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getProfilePicture();
  }

  getProfilePicture(): void {
    const userId = localStorage.getItem('UserId');
    const token = localStorage.getItem('token');
    if (!userId || !token) {
      console.error('User ID or token not found in localStorage');
      return;
    }

    fetch(`http://localhost:3000/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      return response.json();
    })
    .then(userData => {
      const profilePicKey = userData.profilePicture;
      this.imageKey = profilePicKey;
      const profilePic = localStorage.getItem(profilePicKey);

      if (profilePic) {
        this.profilePicture = profilePic;
      } else {
        console.error('Profile picture not found in localStorage');
      }
    })
    .catch(error => {
      console.error('Error fetching profile picture:', error);
    });
  }

  handleFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.fileToUpload = inputElement.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          this.profilePicture = reader.result;
        }
      };
      reader.readAsDataURL(this.fileToUpload);
    }
  }

  handleCancel(): void {
    console.log('Profile picture change canceled');
    this.cancelClick.emit();
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    if (!this.fileToUpload) {
      console.error('No profile picture selected');
      return;
    }

    const formData = new FormData();
    formData.append('profilePicture', this.fileToUpload);

    localStorage.setItem(this.imageKey, this.profilePicture);

    this.handleCancel();

    //this.router.navigate(['/home']);
  }
}
