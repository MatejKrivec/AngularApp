import { Component, OnInit } from '@angular/core';

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
  selector: 'app-bidding-auctions',
  templateUrl: './bidding-auctions.component.html',
  styleUrls: ['./bidding-auctions.component.css']
})
export class BiddingAuctionsComponent implements OnInit {
  biddingAuctions: Auction[] = [];

  ngOnInit(): void {
    this.fetchBiddingAuctions();
  }

  async fetchBiddingAuctions(): Promise<void> {

    const token = localStorage.getItem('token');

    try {
      const userId = localStorage.getItem('UserId');
      if (!userId) {
        throw new Error('User ID not found in local storage');
      }


      const bidsResponse = await fetch(`http://localhost:3000/bids/byUserId/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!bidsResponse.ok) {
        throw new Error('Failed to fetch bids');
      }

      const bidsData = await bidsResponse.json();
      const auctionIds: number[] = Array.from(new Set(bidsData.map((bid: any) => bid.auctionId)));

      const auctionsResponse = await Promise.all(
        auctionIds.map(async (auctionId: number) => {
          const auctionResponse = await fetch(`http://localhost:3000/auctions/one/${auctionId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!auctionResponse.ok) {
            throw new Error(`Failed to fetch auction with ID ${auctionId}`);
          }

          return auctionResponse.json();
        })
      );

      const filteredAuctions = auctionsResponse.filter(auction => new Date(auction.endTime) > new Date());
      filteredAuctions.sort((a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime());

      this.biddingAuctions = filteredAuctions;
    } catch (error: any) {
      console.error(`Error fetching bidding auctions: ${error.message}`);
    }
  }
}
