// main-auctions.component.ts

import { Component, OnInit } from '@angular/core';

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

@Component({
  selector: 'app-home-auctions',
  templateUrl: './home-auctions.component.html',
  styleUrl: './home-auctions.component.css'
})
export class HomeAuctionsComponent implements OnInit {
  auctions: Auction[] = [];
  selectedAuction: Auction | null = null;

  ngOnInit(): void {
    this.fetchAuctions();
  }

  async fetchAuctions(): Promise<void> {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('UserId');
    if (!token || !userId) {
      console.error('Token or User ID not found');
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:3000/auctions/akcije/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch auctions');
      }
      const auctionsData = await response.json();
      const auctionsArray = Array.isArray(auctionsData) ? auctionsData : [auctionsData];

      const filteredAuctions = auctionsArray.filter(auction => new Date(auction.endTime) > new Date());
      filteredAuctions.sort((a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime());
      
      this.auctions = filteredAuctions;
    } catch (error: any) {
      console.error('Error fetching auctions:', error);
      // Optionally display a toast notification for the error
    }
  }

  handleAuctionClick(auction: Auction): void {
    this.selectedAuction = auction;
  }

  handleCloseAuctionDetails(): void {
    this.selectedAuction = null;
  }
}
