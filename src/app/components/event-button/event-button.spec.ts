import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventButton } from './event-button';

describe('EventButton', () => {
  let component: EventButton;
  let fixture: ComponentFixture<EventButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
