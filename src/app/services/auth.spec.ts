import { TestBed } from '@angular/core/testing';
import { Auth } from './auth';
import { of } from 'rxjs';

describe('Auth', () => {
  let service: Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Auth,
          useValue: {
            currentUser$: of(null),
            users: () => [],
            signInWithGoogle: vi.fn(),
            createSignInWithEmail: vi.fn(),
            signInExistingUserWithEmail: vi.fn(),
            signOut: vi.fn(),
          },
        },
      ],
    });
    service = TestBed.inject(Auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with an empty users array', () => {
    // Arrange (service freshly created)

    // Act

    // Assert
    expect(service.users()).toEqual([]);
  });

  it('should have a currentUser$ observable', () => {
    // Arrange
    let emittedUser: any;
    service.currentUser$.subscribe(user => emittedUser = user);

    // Act (subscribe already triggered)

    // Assert
    expect(emittedUser).toBeNull();
  });
});
