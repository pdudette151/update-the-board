import { Injectable, inject } from '@angular/core';
import { Auth as FirebaseAuth, GoogleAuthProvider, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { UserProfile } from '../model/task.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private auth = inject(FirebaseAuth);
  private firestore = inject(Firestore);

  users = toSignal(
    collectionData(collection(this.firestore, 'users')) as Observable<UserProfile[]>,
    { initialValue: [] as UserProfile[] }
  );

  currentUser$ = user(this.auth);

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      await setDoc(doc(this.firestore, 'users', result.user.uid), {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      }, { merge: true });
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
