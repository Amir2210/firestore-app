import { useRef } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { dbFireStore } from '../config/firebase'
export function Form() {
  let inputRef = useRef(null)
  let priceRef = useRef(null)
  let infoRef = useRef(null)
  async function handleSubmit(e) {
    if (!inputRef.current.value || !priceRef.current.value || !infoRef.current.value) {
      alert('enter valid inputs pls')
      e.preventDefault()
      return
    }
    e.preventDefault()
    const newToy = {
      name: inputRef.current.value,
      price: +priceRef.current.value,
      info: infoRef.current.value,
      _id: Date.now()
    }
    try {
      const ref = collection(dbFireStore, 'toys')
      const data = await addDoc(ref, newToy)
    } catch (error) {
      alert('cant add new toy to database')
      console.log(error, 'ERROR!')
    }
    inputRef.current.value = ''
    priceRef.current.value = ''
    infoRef.current.value = ''
  }
  return (
    <form onSubmit={handleSubmit} className=''>
      <h1 className='text-center text-5xl'>Add a new toy form:</h1>
      <div className='flex items-center gap-5 justify-center mt-5'>
        <label htmlFor="name">name:</label>
        <input type="text" ref={inputRef} />

        <label htmlFor="price">price:</label>
        <input type="number" ref={priceRef} />

        <label htmlFor="info">info:</label>
        <input type="text" ref={infoRef} />
      </div>
      <button type='submit' className='bg-sky-400 px-2 my-5 flex mx-auto capitalize p-2 py-3 rounded-md text-white text-xl'>Add new Toy</button>
    </form>
  )
}