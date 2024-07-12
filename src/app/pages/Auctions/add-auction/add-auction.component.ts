import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-auction',
  templateUrl: './add-auction.component.html',
  styleUrls: ['./add-auction.component.css']
})
export class AddAuctionComponent {

  @Output() cancel = new EventEmitter<void>();

  imageKey: string | null = null; // Unique key for the image
  imageUploaded: boolean = false;
  formData = {
    name: '',
    description: '',
    startingPrice: 0,
    endTime: ''
  };
  today: Date = new Date();



  handleAddImageClick(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageKey = `auction-image-${Date.now()}`;
        localStorage.setItem(imageKey, e.target.result);
        this.imageKey = imageKey;
        this.imageUploaded = true;
      };
      reader.readAsDataURL(file);
    }
  }

  handleDeleteImageClick(): void {
    const imageKey = this.imageKey;
    if (imageKey) {
      localStorage.removeItem(imageKey);
      this.imageKey = null;
      this.imageUploaded = false;
    }
  }

  handleInputChange(event: Event, field: 'name' | 'description' | 'startingPrice' | 'endTime'): void {
    const input = event.target as HTMLInputElement;
    if (field === 'startingPrice') {
      this.formData[field] = Number(input.value);
    } else {
      this.formData[field] = input.value;
    }
  }

  handleCancelAddClick(): void {
    this.cancel.emit();
    this.resetForm();
  }

  resetForm(): void {
    this.formData = {
      name: '',
      description: '',
      startingPrice: 0,
      endTime: ''
    };
    this.imageKey = null;
    this.imageUploaded = false;
  }

  async handleStartAuctionSubmit(event: Event): Promise<void> {
    event.preventDefault();
    try {
      if (!this.imageKey) {
        throw new Error('Please upload an image');
      }

      const userId = localStorage.getItem('UserId');
      if (!userId) {
        throw new Error('UserId not found in local storage');
      }

      const auctionData = {
        ...this.formData,
        userId: parseInt(userId, 10),
        image: this.imageKey,
        startTime: new Date(),
        maxPrice: 1000, // Example values, adjust as needed
        price: parseFloat(this.formData.startingPrice.toString()),
        startingPrice: parseFloat(this.formData.startingPrice.toString()),
        endTime: new Date(this.formData.endTime).toISOString()
      };

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const apiUrl = 'http://localhost:3000/auctions'; // Replace with your API endpoint

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(auctionData)
      });

      if (!response.ok) {
        throw new Error('Failed to create auction');
      }

      // Reset form after successful submission
      this.resetForm();

      // Optionally handle success scenario (e.g., redirect or notify user)
      console.log('Auction created successfully');
      this.cancel.emit();

    } catch (error: any) {
      console.error('Error creating auction:', error);
      // Handle error (e.g., display error message to user)
      alert(`Error creating auction: ${error.message}`);
    }
  }

  getImageUrl(imageKey: string): string | null {
    return localStorage.getItem(imageKey);
  }
}
