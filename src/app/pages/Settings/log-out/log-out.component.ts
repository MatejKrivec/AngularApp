import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent {

  @Output() cancelClick = new EventEmitter<void>();

  showProfileSettings = false;

  constructor(private router: Router) {}

  handleProfileSettingsToggle() {
    this.showProfileSettings = !this.showProfileSettings;
  }

  handleCancelFromChild() {
    this.showProfileSettings = !this.showProfileSettings;
    this.cancelClick.emit();
  }

  HandleLogOut() {
    console.log('Logout button clicked');
    localStorage.removeItem('token');
    localStorage.removeItem('UserId');
    this.router.navigate(['/']);
  }
}
