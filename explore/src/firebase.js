// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVLC5mwA49a6ZLXiR-r792lVX4VFCmusg",
  authDomain: "explore-a0a01.firebaseapp.com",
  projectId: "explore-a0a01",
  storageBucket: "explore-a0a01.appspot.com",
  messagingSenderId: "931629611492",
  appId: "1:931629611492:web:cccbb6dc7f82d86c0baff1",
  measurementId: "G-X9VE1D2E93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize and export Firebase services
export const auth = getAuth(app); // Export auth
export const firestore = getFirestore(app);