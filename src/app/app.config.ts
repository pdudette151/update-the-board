import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), 
    provideClientHydration(), 
    provideFirebaseApp(() => initializeApp({
       projectId: "update-the-board", 
       appId: "1:745047801854:web:33efd4f4f2d644d505caaf", 
       storageBucket: "update-the-board.firebasestorage.app", 
       apiKey: "AIzaSyAsqnwDOfO9qPP50p55vigQQR_NMq0lqmE", 
       authDomain: "update-the-board.firebaseapp.com", 
       messagingSenderId: "745047801854", 
       measurementId: "G-JPCXPMQET2", 
      })
    ), 
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ]
};
