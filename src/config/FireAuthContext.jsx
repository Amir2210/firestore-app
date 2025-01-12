import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import { createContext, useContext, useLayoutEffect, useState } from "react";
import { dbFireStore } from './firebase';
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
        fetchFavorites(user)
      }
      else {
        // console.log("logged out")
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

  async function getUserFavorites(user) {
    const userDocRef = doc(dbFireStore, "users", user.uid)
    try {
      const userDoc = await getDoc(userDocRef)
      if (userDoc.exists()) {
        const userData = userDoc.data()
        return userData.favorites || []
      } else {
        console.log("No user document found")
        return []
      }
    } catch (error) {
      console.error("Error retrieving user favorites:", error)
      return []
    }
  }
  async function fetchFavorites(user) {
    const favorites = await getUserFavorites(user)
    setFavoriteToys(favorites)
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
