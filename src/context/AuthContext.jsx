import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null); // FIXED (should NOT be {})

  // Sign Up
  async function signUp(email, password) {
    // 1. Create auth user
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // 2. Create Firestore user doc (ONLY if it doesn't exist)
    const userRef = doc(db, "users", email);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        savedShows: [],
      });
    }

    return result;
  }

  // Log In
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Log Out
  function logOut() {
    return signOut(auth);
  }

  // Keep user logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });

    return () => unsubscribe();
  }, []); // FIXED: add dependency array

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function userAuth() {
  return useContext(AuthContext);
}