import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WonAuctionItemComponent } from './won-auction-item.component';

describe('WonAuctionItemComponent', () => {
  let component: WonAuctionItemComponent;
  let fixture: ComponentFixture<WonAuctionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WonAuctionItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WonAuctionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
