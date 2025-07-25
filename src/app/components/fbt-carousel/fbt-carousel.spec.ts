import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbtCarousel } from './fbt-carousel';

describe('FbtCarousel', () => {
  let component: FbtCarousel;
  let fixture: ComponentFixture<FbtCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FbtCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FbtCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
