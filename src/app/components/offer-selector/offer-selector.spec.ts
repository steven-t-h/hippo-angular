import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferSelector } from './offer-selector';

describe('OfferSelector', () => {
  let component: OfferSelector;
  let fixture: ComponentFixture<OfferSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
