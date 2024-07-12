import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  selectedTab: 'auctions' | 'profile' = 'profile'; // Default to 'profile'
  showLogOut = false;
  profilePicture: string = ''; // Initialize profile picture as an empty string
  showProfileSettings = false;
  username: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setUserData();
  }

  selectTab(tab: 'auctions' | 'profile') {
    this.selectedTab = tab;
  }

  SettingsClick() {
    this.showProfileSettings = true;
    this.showLogOut = true;
  }

  async setUserData() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    try {
      // Decode token
      const decodeResponse = await fetch('http://localhost:3000/decode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });

      if (!decodeResponse.ok) {
        throw new Error('Failed to decode token');
      }

      const userData = await decodeResponse.json();
      const userId = userData.id;
      localStorage.setItem('UserId', userId);

      // Fetch user data including profile picture
      const userResponse = await fetch(`http://localhost:3000/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userDataWithProfilePic = await userResponse.json();
      const profilePicKey = userDataWithProfilePic.profilePicture; // Assuming profilePicture is the key to the image in localStorage
      const profilePicFromLocalStorage = localStorage.getItem(profilePicKey); // Retrieve the profile picture from localStorage
      this.profilePicture = profilePicFromLocalStorage || '/assets/images/DefaultProfilePic.png'; // Set profilePicture or default if not found
      this.username = userDataWithProfilePic.username;

    } catch (error) {
      console.error('Error fetching user data:', error);
      // Handle error (toast or alert)
    }
  }

  handleCancelFromChild(): void {
    this.showLogOut = false; // Hide the LogOutComponent
  }
}
