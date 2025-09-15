import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitHistory } from './visit-history';

describe('VisitHistory', () => {
  let component: VisitHistory;
  let fixture: ComponentFixture<VisitHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
