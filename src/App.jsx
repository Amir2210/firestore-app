import { collection, getDocs } from 'firebase/firestore'
import { dbFireStore } from './config/firebase'
import { useEffect } from 'react'
function App() {

  useEffect(() => {
    getFireStoreData()
  }, [])

  const getFireStoreData = async () => {
    const ref = collection(dbFireStore, "toys")
    const snapshot = await getDocs(ref)
    // console.log(snapshot.docs)
    const toysArray = []
    snapshot.forEach((item) => {
      toysArray.push({ id: item.id, ...item.data() })
    })
    console.log(toysArray)
  }

  return (
    <>
      <h1 className='text-3xl text-red-500'>hello firestore</h1>
    </>
  )
}

export default App
