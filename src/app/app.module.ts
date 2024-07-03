import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitPageComponent } from './pages/init-page/init-page.component';
import { HomePageComponent } from './pages/Home/home-page/home-page.component';
import { HomeProfileComponent } from './pages/Home/home-profile/home-profile.component';
import { HomeAuctionsComponent } from './pages/Home/home-auctions/home-auctions.component';
import { MyAuctionsComponent } from './pages/Auctions/my-auctions/my-auctions.component';
import { BiddingAuctionsComponent } from './pages/Auctions/bidding-auctions/bidding-auctions.component';
import { WonAuctionsComponent } from './pages/Auctions/won-auctions/won-auctions.component';



@NgModule({
  declarations: [
    AppComponent,
    InitPageComponent,
    HomePageComponent,
    HomeProfileComponent,
    HomeAuctionsComponent,
    MyAuctionsComponent,
    BiddingAuctionsComponent,
    WonAuctionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
