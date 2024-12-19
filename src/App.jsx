import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { dbFireStore } from './config/firebase'
import { useEffect, useState } from 'react'
import { Form } from './cmp/form'
import { ToyList } from './cmp/toysList';
import { Modal } from './cmp/Modal';
import { Link } from 'react-router-dom';

function App() {
  const [toys, setToys] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentEditToy, setCurrentEditToy] = useState(null)
  useEffect(() => {
    getFireStoreData()
  }, [toys])
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
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} currentEditToy={currentEditToy} />}
      <main
        className={`bg-zinc-200 z-0 h-screen ${isModalOpen ? "blur-sm" : "blur-none"}`}>
        <div className='flex gap-5 justify-center items-center pt-4'>
          <h1 className="text-4xl">Firestore Application</h1>
          <Link className='bg-green-400 capitalize p-2 py-3 rounded-md' to={'/signup'}>singup</Link>
        </div>
        <h2 className="text-3xl text-center mt-3">Toys Collection:</h2>
        <ToyList toys={toys} setIsModalOpen={setIsModalOpen} setCurrentEditToy={setCurrentEditToy} />
        <Form />
      </main>
    </div>

  )
}

export default App
