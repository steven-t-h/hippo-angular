import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlaviyoSignupForm } from './klaviyo-signup-form';

describe('KlaviyoSignupForm', () => {
  let component: KlaviyoSignupForm;
  let fixture: ComponentFixture<KlaviyoSignupForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KlaviyoSignupForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KlaviyoSignupForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
