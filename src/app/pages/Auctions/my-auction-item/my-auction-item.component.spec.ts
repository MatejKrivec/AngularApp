import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAuctionItemComponent } from './my-auction-item.component';

describe('MyAuctionItemComponent', () => {
  let component: MyAuctionItemComponent;
  let fixture: ComponentFixture<MyAuctionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyAuctionItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAuctionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
