import { Component } from '@angular/core';

@Component({
  selector: 'app-home-profile',
  templateUrl: './home-profile.component.html',
  styleUrl: './home-profile.component.css'
})
export class HomeProfileComponent {
  selectedOption: string = 'option1';

  handleChange(option: string) {
    this.selectedOption = option;
    console.log(`Selected option: ${option}`);
  }
}
