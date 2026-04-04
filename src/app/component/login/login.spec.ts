import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { Auth } from '../../services/auth';
import { of } from 'rxjs';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  const mockAuth = {
    currentUser$: of(null),
    users: () => [],
    signInWithGoogle: vi.fn(),
    createSignInWithEmail: vi.fn(),
    signInExistingUserWithEmail: vi.fn(),
    signOut: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        { provide: Auth, useValue: mockAuth },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty email and password by default', () => {
    // Arrange (component freshly created)

    // Act

    // Assert
    expect(component.email()).toBe('');
    expect(component.password()).toBe('');
  });
});
