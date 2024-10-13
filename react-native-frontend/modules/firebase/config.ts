import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAhFKm0Bt-fA1RtyjiI1xN9VDr9IqMMnLA",
  authDomain: "visconhackathon.firebaseapp.com",
  databaseURL: "https://visconhackathon-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "visconhackathon",
  storageBucket: "visconhackathon.appspot.com",
  messagingSenderId: "612235152272",
  appId: "1:612235152272:web:4a2aaf5a42a3dda5848115",
  measurementId: "G-RSYVM7WBJG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);