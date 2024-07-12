import { Component, Input, OnInit } from '@angular/core';

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

export interface Bid {
  bidId: number;
  userId: number;
  amount: number;
  bidDateTime: string;
}

@Component({
  selector: 'app-bidding-auction-item',
  templateUrl: './bidding-auction-item.component.html',
  styleUrls: ['./bidding-auction-item.component.css']
})
export class BiddingAuctionItemComponent implements OnInit {
  @Input() auction: Auction = {
    auctionId: 0,
    name: '',
    description: '',
    image: '',
    startingPrice: 0,
    maxPrice: 0,
    price: 0,
    startTime: '',
    endTime: ''
  };
  bids: Bid[] = [];
  winningStatus: string = '';

  ngOnInit(): void {
    this.fetchBids();
  }

  async fetchBids(): Promise<void> {
    const token = localStorage.getItem('token');
    try {

      const response = await fetch(`http://localhost:3000/bids/byAuctionId/${this.auction.auctionId}`, {
        headers: {
          'Authorization': `Bearer ${token }`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bids');
      }

      const bidData: Bid[] = await response.json();
      this.bids = bidData;

      if (bidData.length > 0) {
        const highestBid = bidData.reduce((prev, current) => (prev.amount > current.amount ? prev : current));
        const userId = localStorage.getItem('UserId');
        
        if (userId && parseInt(userId, 10) === highestBid.userId) {
          this.winningStatus = 'Winning';
        } else {
          this.winningStatus = 'Outbid';
        }
      } else {
        this.winningStatus = 'No Bids'; // Handle case where there are no bids
      }
    } catch (error: any) {
      console.error(`Error fetching bids: ${error.message}`);
    }
  }

  getStatus(): string {
    return this.winningStatus;
  }

  getStatusClass(): string {
    return this.winningStatus === 'Winning' ? 'WinningStatus' : 'OutbidStatus';
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

  getImageFromLocalStorage(key: string): string {
    const image = localStorage.getItem(key);
    return image ? image : '';
  }
}
