import { Component, Input } from '@angular/core';

export interface Auction {
  auctionId: number;
  name: string;
  description: string;
  image: string;
  startingPrice: number;
  maxPrice: number;
  price: number;
  startTime: string;
  endTime: string;
}
@Component({
  selector: 'app-won-auction-item',
  templateUrl: './won-auction-item.component.html',
  styleUrls: ['./won-auction-item.component.css']
})
export class WonAuctionItemComponent {
  @Input() auction: Auction | null = null; // Define the Auction input property

  getImageFromLocalStorage(key: string): string {
    const image = localStorage.getItem(key) || '';
    return image;
  }
}
