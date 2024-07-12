// auction-item.component.ts

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface Auction {
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

interface Bid {
  bidId: number;
  userId: number;
  amount: number;
}

@Component({
  selector: 'app-auction-item',
  templateUrl: './auction-item.component.html',
  styleUrls: ['./auction-item.component.css']
})
export class AuctionItemComponent implements OnInit {
  @Input() auction!: Auction;
  @Output() auctionClick = new EventEmitter<Auction>();
  winningStatus: string = '';

  ngOnInit(): void {
    this.fetchBids();
  }

  async fetchBids(): Promise<void> {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/bids/byAuctionId/${this.auction.auctionId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }})

      if (!response.ok) {
        throw new Error('Failed to fetch bids');
      }
      const bidData: Bid[] = await response.json();
      if (bidData.length > 0) {
        const highestBid = bidData.reduce((prev, current) => (prev.amount > current.amount ? prev : current));
        const userId = localStorage.getItem('UserId');
        if (userId && parseInt(userId, 10) === highestBid.userId) {
          this.winningStatus = 'Winning';
        } else {
          this.winningStatus = '';
        }
      }
    } catch (error: any) {
      console.error('Error fetching bids:', error);
    }
  }

  handleClick(): void {
    this.auctionClick.emit(this.auction);
  }

  getStatus(): string {
    if (new Date() > new Date(this.auction.endTime)) {
      return 'Done';
    } else {
      return this.winningStatus ? 'Winning' : 'In Progress';
    }
  }

  getStatusClass(): string {
    if (new Date() > new Date(this.auction.endTime)) {
      return 'uniqueDoneStatus';
    } else if (this.winningStatus === 'Winning') {
      return 'uniqueWinningStatus';
    } else {
      return 'inProgressStatus';
    }
  }

  getTimeRemainingString(): string {
    if (new Date() > new Date(this.auction.endTime)) {
      return ''; 
    } else {
      const timeDiffMs = new Date(this.auction.endTime).getTime() - new Date().getTime();
      const hoursRemaining = Math.floor(timeDiffMs / (1000 * 60 * 60)); 

      if (hoursRemaining < 24) {
        return `${hoursRemaining}h`;
      } else if (hoursRemaining < 48) {
        return '1 day';
      } else {
        const daysRemaining = Math.ceil(hoursRemaining / 24);
        return `${daysRemaining} days`;
      }
    }
  }

  getTimeClass(): string {
    const timeDiffMs = new Date(this.auction.endTime).getTime() - new Date().getTime();
    const hoursRemaining = Math.floor(timeDiffMs / (1000 * 60 * 60));
    return hoursRemaining < 24 ? 'uniqueRed' : '';
  }

  getImageFromLocalStorage(key: string): string {
    const image = localStorage.getItem(key);
    return image ? image : '';
  }
}
