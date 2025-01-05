import { useRef } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { dbFireStore } from '../config/firebase'

export function Modal({ setIsModalOpen, currentEditToy, userId, getFireStoreData }) {
  let inputRef = useRef(null)
  let priceRef = useRef(null)
  let infoRef = useRef(null)

  async function handleSubmit(e) {
    if (!inputRef.current.value || !priceRef.current.value || !infoRef.current.value) {
      alert('enter valid inputs pls')
      e.preventDefault()
      return
    }

    if (userId !== currentEditToy.userId) {
      alert('You are not the owner of this toy')
      e.preventDefault()
      return
    }

    e.preventDefault()
    const newUpdateToy = {
      name: inputRef.current.value,
      price: +priceRef.current.value,
      info: infoRef.current.value,
      _id: currentEditToy._id
    }

    try {
      const ref = doc(dbFireStore, 'toys', currentEditToy.id)
      const data = await updateDoc(ref, newUpdateToy)
      getFireStoreData()
    } catch (error) {
      alert('cant update toy to database')
      console.log(error, 'ERROR!')
    }
    inputRef.current.value = ''
    priceRef.current.value = ''
    infoRef.current.value = ''
    setIsModalOpen(false)
  }

  return (
    <div className="z-40 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-zinc-200 p-6 rounded-lg shadow-lg ">
        <h1 className="text-gray-700 text-2xl font-bold mb-4">Edit Toy</h1>
        <form onSubmit={handleSubmit} className='text-gray-700 mb-6'>
          <div className='flex items-center gap-5 justify-center mt-5'>
            <label htmlFor="name">name:</label>
            <input defaultValue={currentEditToy.name} type="text" ref={inputRef} />

            <label htmlFor="price">price:</label>
            <input defaultValue={currentEditToy.price} type="number" ref={priceRef} />

            <label htmlFor="info">info:</label>
            <input defaultValue={currentEditToy.info} type="text" ref={infoRef} />
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button type='button' onClick={() => setIsModalOpen(false)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
              Close
            </button>
            <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Confirm
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}