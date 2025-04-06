// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// only want google login then remove this
import { getFirestore } from "firebase/firestore";

// getAuth is responsible for storing the userdata from google when he is logiing in

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOhvtsJ8zRPKDaWiAG3EftX0bhYcW30N4",
  authDomain: "houseofram-fashion.firebaseapp.com",
  projectId: "houseofram-fashion",
  storageBucket: "houseofram-fashion.firebasestorage.app",
  messagingSenderId: "565593684198",
  appId: "1:565593684198:web:d2d26c1efd20e74a32e327",
  measurementId: "G-71ZF9MJP81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services with proper types
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;