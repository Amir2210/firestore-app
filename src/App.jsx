import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { dbFireStore } from './config/firebase'
import { useEffect, useState } from 'react'
import { Form } from './cmp/form'
import { ToyList } from './cmp/toysList';
import { Modal } from './cmp/Modal';

function App() {
  const [toys, setToys] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  useEffect(() => {
    getFireStoreData()
  }, [toys])

  const openModal = () => {
    setIsModalOpen(!isModalOpen)
  }
  const closeModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const getFireStoreData = async () => {
    try {
      const ref = collection(dbFireStore, "toys")
      //sort by last added
      const q = query(ref, orderBy('_id', 'desc'))
      const snapshot = await getDocs(q)
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
    <div className="relative">
      {isModalOpen && <Modal closeModal={closeModal} />}
      <main
        className={`bg-zinc-200 z-0 h-screen ${isModalOpen ? "blur-sm" : "blur-none"}`}>
        <h1 className="text-4xl text-center">Firestore Application</h1>
        <h2 className="text-3xl text-center mt-3">Toys Collection:</h2>
        <ToyList toys={toys} openModal={openModal} />
        <Form />
      </main>
    </div>

  )
}

export default App
