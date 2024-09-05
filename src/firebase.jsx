import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA98gA9FvuuOaNJBbMm47IxYNBzp3jmkiA",
  authDomain: "moviedatabase-77231.firebaseapp.com",
  projectId: "moviedatabase-77231",
  storageBucket: "moviedatabase-77231.appspot.com",
  messagingSenderId: "91655832448",
  appId: "1:91655832448:web:382ca0180589b5d1fb3765",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
