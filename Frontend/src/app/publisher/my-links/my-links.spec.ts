import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLinks } from './my-links';

describe('MyLinks', () => {
  let component: MyLinks;
  let fixture: ComponentFixture<MyLinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyLinks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyLinks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
