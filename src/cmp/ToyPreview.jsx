import { IoTrashBin } from "react-icons/io5"
import { MdEdit } from "react-icons/md"
import { doc, deleteDoc, arrayUnion, updateDoc, arrayRemove, setDoc } from 'firebase/firestore'
import { dbFireStore } from '../config/firebase'
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io"
import { useState } from 'react'
import { useFireAuthContext } from '../config/FireAuthContext'

export function ToyPreview({ toy, setIsModalOpen, setCurrentEditToy, userId, getFireStoreData }) {
  const [isFavorite, setIsFavorite] = useState(toy.isFavorite)
  const { favoriteToys, setFavoriteToys } = useFireAuthContext()


  async function onDeleteToy() {
    if (userId !== toy.userId) {
      alert('You are not the owner of this toy')
      return
    }
    try {
      const ref = doc(dbFireStore, 'toys', toy.id)
      const data = await deleteDoc(ref)
      getFireStoreData()
    } catch (error) {
      alert('sorry cant delete toy try again later...')
      console.log('error:', error)
    }
  }

  const addFavoriteToy = async (userId, toy) => {
    if (!userId) {
      alert('You must log in to make favorite list')
      return
    }
    if (!toy) {
      alert('Error Toy not found')
      throw new Error("Invalid r toy")
    }

    const userDocRef = doc(dbFireStore, "users", userId)
    try {
      await updateDoc(userDocRef, {
        favorites: arrayUnion({ ...toy, isFavorite: true }),
      })
      alert(`Toy with ID ${toy._id} added to favorites`)
      setIsFavorite(true)
      setFavoriteToys([{ ...toy, isFavorite: true }, ...favoriteToys,])
    } catch (error) {
      console.error("Error adding favorite toy:", error)
    }
  }

  const removeFavoriteToy = async (userId, toy) => {
    if (!userId || !toy) throw new Error("Invalid userId or toy")

    const userDocRef = doc(dbFireStore, "users", userId)
    try {

      await updateDoc(userDocRef, {
        favorites: arrayRemove(toy),
      })
      alert(`Toy with ID ${toy._id} removed from favorites`)
      setIsFavorite(false)
      const filteredToys = favoriteToys.filter((t) => t._id !== toy._id)
      setFavoriteToys(filteredToys)
    } catch (error) {
      console.error("Error removing favorite toy:", error)
    }
  }

  return (
    <li className='w-full min-h-44 justify-center flex flex-col items-center gap-5 capitalize bg-yellow-50 p-4 text-xl rounded-md shadow-md mb-4'>
      <h1>owner: {toy.userName}</h1>
      <h1>toy name: {toy.name}</h1>
      <h2>price: <span className='font-bold'>{toy.price}₪ NIS</span></h2>
      <h3>info:  {toy.info}</h3>
      <img className='max-h-28' src={toy.imgUrl} alt={toy.name} />
      <div className='flex gap-2 items-center'>
        <button onClick={onDeleteToy} className='text-red-600'><IoTrashBin /></button>
        <button onClick={() => {
          if (userId !== toy.userId) {
            alert('You are not the owner of this toy')
            return
          }
          setIsModalOpen(true)
          setCurrentEditToy(toy)
        }
        } className='text-blue-600'><MdEdit />
        </button>
        {isFavorite ?
          <button onClick={() => removeFavoriteToy(userId, toy)}><IoMdHeart className='text-red-400' /></button>
          : <button onClick={() => addFavoriteToy(userId, toy)}><IoMdHeartEmpty className='' /></button>}
      </div>
    </li>
  )
}