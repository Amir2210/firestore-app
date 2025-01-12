import { doc, getDoc } from 'firebase/firestore'
import { dbFireStore } from '../config/firebase'
import { useFireAuthContext } from '../config/FireAuthContext'

export function ShowFavoriteToys() {
  const { isFavoriteShow, setIsFavoriteShow } = useFireAuthContext()
  // const getUserFavorites = async (userId) => {
  //   if (!userId) throw new Error("Invalid userId")

  //   const userDocRef = doc(dbFireStore, "users", userId)
  //   try {
  //     const userDoc = await getDoc(userDocRef)
  //     if (userDoc.exists()) {
  //       const userData = userDoc.data()
  //       return userData.favorites || []
  //     } else {
  //       console.log("No user document found")
  //       return []
  //     }
  //   } catch (error) {
  //     console.error("Error retrieving user favorites:", error)
  //     return []
  //   }
  // }
  // const fetchFavorites = async () => {
  //   const favorites = await getUserFavorites(userId)
  //   setFavoriteToys(favorites)
  // }
  // fetchFavorites()
  return (
    <button onClick={() => setIsFavoriteShow(!isFavoriteShow)} className='btn bg-purple-400'>{isFavoriteShow ? 'Show all Toys' : ' Show favorite Toys'}</button>
  )
}