import { IoTrashBin } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { doc, deleteDoc } from 'firebase/firestore'
import { dbFireStore } from '../config/firebase'

export function ToyPreview({ toy, setIsModalOpen, setCurrentEditToy, userId, getFireStoreData }) {

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
      </div>
    </li>
  )
}