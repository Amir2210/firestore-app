import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import { createContext, useContext, useLayoutEffect, useState } from "react";
// import { auth } from "../config/firebase";
export const AuthContext = createContext(null);


export default function AuthProvider({ children, auth }) {
  const [userFire, setUserFire] = useState({})
  const [toyFilter, setToyFilter] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(getThemeFromLocalStorage())
  const [favoriteToys, setFavoriteToys] = useState([])
  const [isFavoriteShow, setIsFavoriteShow] = useState(false)

  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserFire(user)
      }
      else {
        console.log("logged out");
        setUserFire(null)
      }
    })

  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev)
    localStorage.setItem('theme', !isDarkMode)
  }

  function getThemeFromLocalStorage() {
    return localStorage.getItem('theme') === 'true' ? true : false || false
  }



  const globalVal = {
    userFire,
    toyFilter,
    setToyFilter,
    isDarkMode, toggleDarkMode, getThemeFromLocalStorage,
    favoriteToys, setFavoriteToys, isFavoriteShow, setIsFavoriteShow
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
