import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Auth } from './services/auth';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';

describe('App', () => {
  const mockAuth = {
    currentUser$: of(null),
    users: () => [],
    signOut: vi.fn(),
    signInWithGoogle: vi.fn(),
    createSignInWithEmail: vi.fn(),
    signInExistingUserWithEmail: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, RouterModule.forRoot([])],
      providers: [
        { provide: Auth, useValue: mockAuth },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should show login overlay when no user is signed in', () => {
    // Arrange
    const fixture = TestBed.createComponent(App);

    // Act
    fixture.detectChanges();

    // Assert
    const overlay = fixture.nativeElement.querySelector('#login-overlay');
    expect(overlay).toBeTruthy();
  });
});
