import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMyAccount } from './delete-my-account';

describe('DeleteMyAccount', () => {
  let component: DeleteMyAccount;
  let fixture: ComponentFixture<DeleteMyAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteMyAccount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMyAccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
