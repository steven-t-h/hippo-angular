import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteButton } from './route-button';

describe('RouteButton', () => {
  let component: RouteButton;
  let fixture: ComponentFixture<RouteButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
