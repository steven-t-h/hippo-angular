import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicHeader } from './basic-header';

describe('BasicHeader', () => {
  let component: BasicHeader;
  let fixture: ComponentFixture<BasicHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
