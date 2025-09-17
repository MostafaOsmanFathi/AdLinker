import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authinticatedGuardGuard } from './authenticated-guard-guard';

describe('authinticatedGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authinticatedGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
