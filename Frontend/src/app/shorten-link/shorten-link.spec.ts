import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortenLink } from './shorten-link';

describe('ShortenLink', () => {
  let component: ShortenLink;
  let fixture: ComponentFixture<ShortenLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortenLink]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortenLink);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
