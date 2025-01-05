import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { dbFireStore } from '../config/firebase'
import { Link } from 'react-router-dom'
import { useFireAuthContext } from '../config/FireAuthContext';

export function AddToy() {
  let inputRef = useRef(null)
  let priceRef = useRef(null)
  let infoRef = useRef(null)
  const { userFire } = useFireAuthContext();
  const userId = userFire?.uid;
  const userName = userFire?.email ? getNameFromEmail() : ''
  const navigate = useNavigate()

  function getNameFromEmail() {
    let greet = ''
    const index = userFire.email.indexOf('@')
    greet += userFire.email.slice(0, index)
    return greet
  }
  async function handleSubmit(e) {
    if (!inputRef.current.value || !priceRef.current.value || !infoRef.current.value) {
      alert('enter valid inputs pls')
      e.preventDefault()
      return
    }
    if (!userId) {
      alert('you must login to add a new Toy!')
      e.preventDefault()
      return
    }
    e.preventDefault()
    const newToy = {
      name: inputRef.current.value,
      price: +priceRef.current.value,
      info: infoRef.current.value,
      _id: Date.now(),
      userId,
      userName
    }
    try {
      const ref = collection(dbFireStore, 'toys')
      const data = await addDoc(ref, newToy)
      navigate('/')
    } catch (error) {
      alert('cant add new toy to database')
      console.log(error, 'ERROR!')
    }
    inputRef.current.value = ''
    priceRef.current.value = ''
    infoRef.current.value = ''

  }
  return (
    <form onSubmit={handleSubmit} className='bg-zinc-200 h-screen flex flex-col items-center justify-center'>
      <h1 className='text-center text-5xl'>Add a new toy form:</h1>
      <div className='flex flex-col sm:flex-row items-center gap-5 justify-center mt-5'>
        <label htmlFor="name">name:</label>
        <input type="text" ref={inputRef} />

        <label htmlFor="price">price:</label>
        <input type="number" ref={priceRef} />

        <label htmlFor="info">info:</label>
        <input type="text" ref={infoRef} />
      </div>
      <button type='submit' className='bg-sky-400 px-2 my-5 flex mx-auto btn'>Add new Toy</button>
      <Link to={'/'} className='bg-violet-400 btn'>Back</Link>
    </form>
  )
}

