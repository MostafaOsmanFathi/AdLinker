import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLink } from './create-link';

describe('CreateLink', () => {
  let component: CreateLink;
  let fixture: ComponentFixture<CreateLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLink]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLink);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
