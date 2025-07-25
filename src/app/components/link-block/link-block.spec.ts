import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkBlock } from './link-block';

describe('LinkBlock', () => {
  let component: LinkBlock;
  let fixture: ComponentFixture<LinkBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
