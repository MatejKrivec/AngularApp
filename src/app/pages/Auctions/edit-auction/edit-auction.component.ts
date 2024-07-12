import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  selector: 'app-edit-auction',
  templateUrl: './edit-auction.component.html',
  styleUrls: ['./edit-auction.component.css']
})
export class EditAuctionComponent implements OnInit {
  @Input() auction!: Auction;
  @Output() cancel = new EventEmitter<void>();

  imageUploaded = false;
  image: string | null = null;
  formData = {
    name: '',
    description: '',
    endTime: ''
  };

  today = new Date();

  ngOnInit(): void {
    if (this.auction) {
      this.formData.name = this.auction.name;
      this.formData.description = this.auction.description;

      const imageData = localStorage.getItem(this.auction.image);
      if (imageData) {
        this.image = imageData;
        this.imageUploaded = true;
      }
    }
  }

  handleAddImageClick(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        this.image = reader.result;
        this.imageUploaded = true;
      }
    };

    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      reader.readAsDataURL(file);
    }
  }

  handleDeleteImageClick(): void {
    this.image = null;
    this.imageUploaded = false;
  }

  handleInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const { name, value } = input;
    this.formData = {
      ...this.formData,
      [name]: value
    };
  }

  async handleEditAuctionSubmit(event: Event): Promise<void> {
    event.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const endpoint = `http://localhost:3000/auctions/${this.auction.auctionId}`;

      const requestBody: any = {
        name: this.formData.name,
        description: this.formData.description
      };

      if (this.formData.endTime) {
        requestBody.endTime = new Date(this.formData.endTime).toISOString();
      }

      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Failed to edit auction');
      }

      if (this.auction.image && this.image) {
        localStorage.setItem(this.auction.image, this.image);
      }

      this.handleCancelClick();

    } catch (error: any) {
      console.error(`Error editing auction: ${error.message}`);
    }
  }

  handleCancelClick(): void {
    console.log('Edit canceled');
    this.cancel.emit();
  }
}