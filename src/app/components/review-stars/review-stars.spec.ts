import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewStars } from './review-stars';

describe('ReviewStars', () => {
  let component: ReviewStars;
  let fixture: ComponentFixture<ReviewStars>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewStars]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewStars);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
