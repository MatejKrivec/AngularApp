import { Component, Input, Output, EventEmitter } from '@angular/core';

interface Auction {
  userId: number;
  auctionId: number;
  name: string;
  description: string;
  image: string; // Change to imageKey instead of image
  startingPrice: number;
  maxPrice: number;
  price: number;
  startTime: Date;
  endTime: Date;
}

@Component({
  selector: 'app-my-auction-item',
  templateUrl: './my-auction-item.component.html',
  styleUrls: ['./my-auction-item.component.css']
})
export class MyAuctionItemComponent {
  @Input() auction!: Auction;
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  getImageUrl(imageKey: string): string | null {
    return localStorage.getItem(imageKey);
  }

  handleEditAuctionClick(): void {
    this.edit.emit();
  }

  handleDeleteAuctionClick(): void {
    this.delete.emit();
  }

  getRemainingTimeInHours(endTime: Date): number {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end.getTime() - now.getTime();
    return Math.max(Math.floor(diff / (1000 * 60 * 60)), 0); 
  }

  isAuctionDone(): boolean {
    const now = new Date();
    const end = new Date(this.auction.endTime);
    return now >= end;
  }

  getAuctionStatusText(): string {
    return this.isAuctionDone() ? 'Done' : 'In Progress';
  }

  getAuctionStatusClass(): string {
    return this.isAuctionDone() ? 'doneStatus' : 'inProgressStatus';
  }
}
