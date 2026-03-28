import { Injectable, inject } from '@angular/core';
import { Auth as FirebaseAuth, GoogleAuthProvider, signInWithPopup, signOut, user} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private auth = inject(FirebaseAuth);
  currentUser$ = user(this.auth);

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(this.auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  }

  async signOut(){
    try{
      await signOut(this.auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
}
