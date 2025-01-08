import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useLayoutEffect, useState } from "react";
// import { auth } from "../config/firebase";
export const AuthContext = createContext(null);


export default function AuthProvider({ children, auth }) {
  const [userFire, setUserFire] = useState({})
  const [toyFilter, setToyFilter] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)

  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user logged in", user)
        setUserFire(user)
      }
      else {
        console.log("logged out");
        setUserFire(null)
      }
    })
  }, [])

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const globalVal = {
    userFire,
    toyFilter,
    setToyFilter,
    isDarkMode, toggleDarkMode
  }

  return (
    <AuthContext.Provider value={globalVal}>
      {children}
    </AuthContext.Provider>
  )
}

export const useFireAuthContext = () => {
  return useContext(AuthContext)
}
