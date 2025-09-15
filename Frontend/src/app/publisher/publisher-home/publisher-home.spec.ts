import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherHome } from './publisher-home';

describe('PublisherHome', () => {
  let component: PublisherHome;
  let fixture: ComponentFixture<PublisherHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublisherHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublisherHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
