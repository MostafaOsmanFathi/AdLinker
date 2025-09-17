import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibleLinks } from './visible-links';

describe('VisibleLinks', () => {
  let component: VisibleLinks;
  let fixture: ComponentFixture<VisibleLinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisibleLinks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisibleLinks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
