import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingAuctionsComponent } from './bidding-auctions.component';

describe('BiddingAuctionsComponent', () => {
  let component: BiddingAuctionsComponent;
  let fixture: ComponentFixture<BiddingAuctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BiddingAuctionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiddingAuctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
