import { collection, getDocs } from 'firebase/firestore'
import { dbFireStore } from './config/firebase'
import { useEffect, useState } from 'react'
import { Form } from './cmp/form'
function App() {

  const [toys, setToys] = useState([])

  useEffect(() => {
    getFireStoreData()
  }, [toys])

  const getFireStoreData = async () => {
    try {
      const ref = collection(dbFireStore, "toys")
      const snapshot = await getDocs(ref)
      // console.log(snapshot.docs)
      const toysArray = []
      snapshot.forEach((item) => {
        toysArray.push({ id: item.id, ...item.data() })
      })
      setToys(toysArray)
    } catch (error) {
      alert('there was an Error try again')
      console.log(error, 'ERROR!')
    }
  }

  return (
    <main className='bg-zinc-200 h-screen'>
      <h1 className='text-4xl text-center'>Firestore Application</h1>
      <h2 className='text-3xl text-center mt-3'>Toys Collection:</h2>
      <ul className='flex flex-col items-center mt-4'>
        {toys.map((toy) => {
          return (
            <li key={toy.id} className='flex gap-5 capitalize bg-yellow-50 p-4 text-xl rounded-sm mb-4'>
              <h1>toy name: {toy.name}</h1>
              <h2>price: <span className='font-bold'>{toy.price}₪ NIS</span></h2>
              <h3>info:  {toy.info}</h3>
            </li>
          )
        })}
      </ul>
      <Form />
    </main>
  )
}

export default App
