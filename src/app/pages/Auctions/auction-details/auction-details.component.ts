// auction-details.component.ts
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

// auction.model.ts
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
  bidDateTime: Date;
}

export interface User {
  id: number;
  username: string;
  profilePicture: string;
}

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrls: ['./auction-details.component.css']
})
export class AuctionDetailsComponent implements OnInit {
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
  @Input() currentPrice: number = 0;
  @Output() cancelClick = new EventEmitter<void>();

  bidAmount: number = 0;
  bids: Bid[] = [];
  users: { [key: number]: User } = {};
  winningStatus: string = '';
  updatedCurrentPrice: number = 0;

  ngOnInit(): void {
    this.updatedCurrentPrice = this.auction.price;
    this.bidAmount = this.updatedCurrentPrice + 1;
    this.fetchBids();
  }

  async fetchBids(): Promise<void> {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/bids/byAuctionId/${this.auction.auctionId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch bids');
      }
      const bidData: Bid[] = await response.json();
      const sortedBids = [...bidData].sort((a, b) => b.amount - a.amount);
      this.bids = sortedBids;

      if (sortedBids.length > 0) {
        const highestBid = sortedBids[0];
        const userId = localStorage.getItem('UserId');
        if (userId && parseInt(userId, 10) === highestBid.userId) {
          this.winningStatus = 'Winning';
        } else {
          this.winningStatus = 'Outbid';
        }
      }

      const userIds = sortedBids.map(bid => bid.userId);
      for (const userId of userIds) {
        const userResponse = await fetch(`http://localhost:3000/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (userResponse.ok) {
          const userData: User = await userResponse.json();
          this.users[userId] = userData;
        }
      }
    } catch (error: any) {
      console.error(`Error fetching bids: ${error.message}`);
    }
  }

  handleCancel(event: Event): void {
    event.stopPropagation();
    this.cancelClick.emit();
  }

  async handlePlaceBid(): Promise<void> {
    const userId = localStorage.getItem('UserId') ?? "404";
    const datetime = new Date();
    const token = localStorage.getItem('token');

    if (this.bidAmount <= this.updatedCurrentPrice) {
      return;
    }

    try {
      const patchResponse = await fetch(`http://localhost:3000/auctions/${this.auction.auctionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ price: this.bidAmount })
      });

      if (!patchResponse.ok) {
        throw new Error('Failed to update auction price');
      }

      const bidResponse = await fetch('http://localhost:3000/bids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: parseInt(userId, 10),
          auctionId: this.auction.auctionId,
          itemId: 456,
          amount: this.bidAmount,
          bidDateTime: datetime.toISOString()
        })
      });

      if (!bidResponse.ok) {
        throw new Error('Failed to place bid');
      }

      this.updatedCurrentPrice = this.bidAmount;
      this.bidAmount = this.bidAmount;
      await this.fetchBids();
    } catch (error: any) {
      console.error(`Error placing bid: ${error.message}`);
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

  getImageFromLocalStorage(key: string): string {
    const image = localStorage.getItem(key);
    return image ? image : '';
  }

  getStatus(): string {
    return this.winningStatus;
  }
}
