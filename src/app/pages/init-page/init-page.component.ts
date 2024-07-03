import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-init-page',
  templateUrl: './init-page.component.html',
  styleUrl: './init-page.component.css'
})
export class InitPageComponent {

  constructor(private router: Router) {}

  onLogin() {
    console.log('Login button clicked');
    this.router.navigate(['/home']);
  }

}
