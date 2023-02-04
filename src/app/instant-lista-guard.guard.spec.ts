import { TestBed } from '@angular/core/testing';

import { InstantListaGuardGuard } from './instant-lista-guard.guard';

describe('InstantListaGuardGuard', () => {
  let guard: InstantListaGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InstantListaGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
