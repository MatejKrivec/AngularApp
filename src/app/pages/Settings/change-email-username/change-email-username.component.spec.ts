import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmailUsernameComponent } from './change-email-username.component';

describe('ChangeEmailUsernameComponent', () => {
  let component: ChangeEmailUsernameComponent;
  let fixture: ComponentFixture<ChangeEmailUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeEmailUsernameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeEmailUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
