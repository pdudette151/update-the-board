import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router, RouterModule } from '@angular/router';
import { authGuard } from './auth-guard';
import { Auth } from '../services/auth';
import { of } from 'rxjs';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  const mockAuth = {
    currentUser$: of(null),
    users: () => [],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      providers: [
        { provide: Auth, useValue: mockAuth },
      ],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
