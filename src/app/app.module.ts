import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitPageComponent } from './pages/init-page/init-page.component';
import { HomePageComponent } from './pages/Home/home-page/home-page.component';
import { HomeProfileComponent } from './pages/Home/home-profile/home-profile.component';
import { HomeAuctionsComponent } from './pages/Home/home-auctions/home-auctions.component';
import { MyAuctionsComponent } from './pages/Home/profile-auctions/my-auctions/my-auctions.component';
import { BiddingAuctionsComponent } from './pages/Home/profile-auctions/bidding-auctions/bidding-auctions.component';
import { WonAuctionsComponent } from './pages/Home/profile-auctions/won-auctions/won-auctions.component';
import { ChangeEmailUsernameComponent } from './pages/Settings/change-email-username/change-email-username.component';
import { ChangePasswordComponent } from './pages/Settings/change-password/change-password.component';
import { ChangeProfilePictureComponent } from './pages/Settings/change-profile-picture/change-profile-picture.component';
import { LogOutComponent } from './pages/Settings/log-out/log-out.component';
import { AuctionItemComponent } from './pages/Auctions/auction-item/auction-item.component';
import { AuctionDetailsComponent } from './pages/Auctions/auction-details/auction-details.component';
import { AddAuctionComponent } from './pages/Auctions/add-auction/add-auction.component';
import { EditAuctionComponent } from './pages/Auctions/edit-auction/edit-auction.component';
import { SignupComponent } from './pages/Auth/signup/signup.component';
import { SigninComponent } from './pages/Auth/signin/signin.component';
import { MyAuctionItemComponent } from './pages/Auctions/my-auction-item/my-auction-item.component';
import { BiddingAuctionItemComponent } from './pages/Auctions/bidding-auction-item/bidding-auction-item.component';
import { WonAuctionItemComponent } from './pages/Auctions/won-auction-item/won-auction-item.component';



@NgModule({
  declarations: [
    AppComponent,
    InitPageComponent,
    HomePageComponent,
    HomeProfileComponent,
    HomeAuctionsComponent,
    MyAuctionsComponent,
    BiddingAuctionsComponent,
    WonAuctionsComponent,
    ChangeEmailUsernameComponent,
    ChangePasswordComponent,
    ChangeProfilePictureComponent,
    LogOutComponent,
    AuctionItemComponent,
    AuctionDetailsComponent,
    AddAuctionComponent,
    EditAuctionComponent,
    SignupComponent,
    SigninComponent,
    MyAuctionItemComponent,
    BiddingAuctionItemComponent,
    WonAuctionItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
