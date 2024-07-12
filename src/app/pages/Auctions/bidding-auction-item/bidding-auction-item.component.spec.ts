import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingAuctionItemComponent } from './bidding-auction-item.component';

describe('BiddingAuctionItemComponent', () => {
  let component: BiddingAuctionItemComponent;
  let fixture: ComponentFixture<BiddingAuctionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BiddingAuctionItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiddingAuctionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
