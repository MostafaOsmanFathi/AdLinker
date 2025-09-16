import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { publisherGuardGuard } from './publisher-guard-guard';

describe('publisherGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => publisherGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
