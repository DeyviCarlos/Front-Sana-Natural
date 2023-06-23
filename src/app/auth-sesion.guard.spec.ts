import { TestBed } from '@angular/core/testing';

import { AuthSesionGuard } from './auth-sesion.guard';

describe('AuthSesionGuard', () => {
  let guard: AuthSesionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthSesionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
