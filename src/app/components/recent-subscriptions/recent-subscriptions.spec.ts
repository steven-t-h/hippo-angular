import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentSubscriptions } from './recent-subscriptions';

describe('RecentSubscriptions', () => {
  let component: RecentSubscriptions;
  let fixture: ComponentFixture<RecentSubscriptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentSubscriptions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentSubscriptions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
