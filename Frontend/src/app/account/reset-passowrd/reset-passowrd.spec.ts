import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPassowrd } from './reset-passowrd';

describe('ResetPassowrd', () => {
  let component: ResetPassowrd;
  let fixture: ComponentFixture<ResetPassowrd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPassowrd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPassowrd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
