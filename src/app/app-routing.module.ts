import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitPageComponent } from './pages/init-page/init-page.component';
import { HomePageComponent } from './pages/Home/home-page/home-page.component';
import { LogOutComponent } from './pages/Settings/log-out/log-out.component';
import { ChangeEmailUsernameComponent } from './pages/Settings/change-email-username/change-email-username.component';
import { ChangePasswordComponent } from './pages/Settings/change-password/change-password.component';
import { ChangeProfilePictureComponent } from './pages/Settings/change-profile-picture/change-profile-picture.component';
import { SigninComponent } from './pages/Auth/signin/signin.component';
import { SignupComponent } from './pages/Auth/signup/signup.component';

const routes: Routes = [
  { path: '', component: InitPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'settings', component: LogOutComponent },
  { path: 'changeUsernameEmail', component: ChangeEmailUsernameComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: 'changeProfilePic', component: ChangeProfilePictureComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
