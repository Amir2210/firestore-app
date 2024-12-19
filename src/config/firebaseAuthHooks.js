import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";

export const useSignupFire = (auth) => {
  // will show if there error and what is the error
  const [error, setError] = useState(null);


  const signup = async (email, password) => {
    try {
      setError(null);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("user created:", res.user);
      return res.user
    }
    catch (err) {
      setError(err.message);
    }
  }


  return { error, signup }
}

export const useLoginFire = (auth) => {
  const [error, setError] = useState(null);
  const login = async (email, password) => {
    try {
      setError(null);
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log("user logged in:", res.user);
      return res.user;
    }
    catch (err) {
      setError(err.message);
    }
  }


  return { error, login }
}