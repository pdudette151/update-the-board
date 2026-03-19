// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsqnwDOfO9qPP50p55vigQQR_NMq0lqmE",
  authDomain: "update-the-board.firebaseapp.com",
  projectId: "update-the-board",
  storageBucket: "update-the-board.firebasestorage.app",
  messagingSenderId: "745047801854",
  appId: "1:745047801854:web:1169708e2a40147205caaf",
  measurementId: "G-28WZBJG9TN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);