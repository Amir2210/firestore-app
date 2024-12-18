import { collection, getDocs } from 'firebase/firestore'
import { dbFireStore } from './config/firebase'
import { useEffect, useState } from 'react'
function App() {

  const [toys, setToys] = useState([])

  useEffect(() => {
    getFireStoreData()
  }, [])

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
      <ul>
        {toys.map((toy) => {
          return (
            <li key={toy.id}>
              <h1>{toy.name}</h1>
            </li>
          )
        })}
      </ul>
    </main>
  )
}

export default App
