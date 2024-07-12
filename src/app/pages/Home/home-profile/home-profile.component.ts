import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-profile',
  templateUrl: './home-profile.component.html',
  styleUrls: ['./home-profile.component.css']
})
export class HomeProfileComponent implements OnInit {
  @Input() username: string = '';
  selectedOption: string = 'option1';


  ngOnInit(): void {
    this.setUserData();

  }

  handleChange(option: string) {
    this.selectedOption = option;
    console.log(`Selected option: ${option}`);
  }



  async setUserData() {
    const id = localStorage.getItem('UserId');
    const token = localStorage.getItem('token');
    if (id) {
      try {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error fetching user data');
        }

        const data = await response.json();
        this.username = data.username;
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    }
  }
}
