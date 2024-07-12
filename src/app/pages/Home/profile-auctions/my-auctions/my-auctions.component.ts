import { Component, OnInit } from '@angular/core';

interface Auction {
  userId: number;
  auctionId: number;
  name: string;
  description: string;
  image: string;
  startingPrice: number;
  maxPrice: number;
  price: number;
  startTime: Date;
  endTime: Date;
}

@Component({
  selector: 'app-my-auctions',
  templateUrl: './my-auctions.component.html',
  styleUrls: ['./my-auctions.component.css']
})
export class MyAuctionsComponent implements OnInit {
  auctions: Auction[] = [];
  addAuctionVisible = false;
  editAuctionVisible = false;
  editAuction: Auction | null = null;

  ngOnInit(): void {
    this.fetchAuctions();
  }

  async fetchAuctions(): Promise<void> {
    try {
      const userId = localStorage.getItem('UserId');
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:3000/auctions/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch auctions');
      }
      const data = await response.json();
      this.auctions = Array.isArray(data) ? data : [data];
      this.auctions.sort((a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime());
    } catch (error) {
      console.error('Error fetching auctions:', error);
    }
  }

  handleAddAuctionClick(): void {
    this.addAuctionVisible = true;
  }

  handleCancelAddClick(): void {
    this.addAuctionVisible = false;
    this.fetchAuctions(); // Refresh the auctions list after adding
  }

  handleEditAuctionClick(auction: Auction): void {
    this.editAuction = auction;
    this.editAuctionVisible = true;
  }

  handleCancelEditClick(): void {
    this.editAuctionVisible = false;
    this.fetchAuctions(); // Refresh the auctions list after editing
  }

  async handleDeleteAuctionClick(auctionId: number, image: string): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/auctions/${auctionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete auction');
      }
      this.auctions = this.auctions.filter(auction => auction.auctionId !== auctionId);

      // Remove image from local storage
      localStorage.removeItem(image);
    } catch (error) {
      console.error('Error deleting auction:', error);
    }
  }
}
