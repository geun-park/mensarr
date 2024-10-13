import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDgkbb6bJukGoKViEICVuyKFaf-QAXoP1M",
  authDomain: "vishack-4cd12.firebaseapp.com",
  projectId: "vishack-4cd12",
  storageBucket: "vishack-4cd12.appspot.com",
  messagingSenderId: "1044444422650",
  appId: "1:1044444422650:web:8bd37ddefd1981a6180443",
  measurementId: "G-V7L82T9116"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);