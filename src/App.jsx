import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { auth, dbFireStore } from './config/firebase'
import { useEffect, useState } from 'react'
import { Form } from './cmp/form'
import { ToyList } from './cmp/toysList';
import { Modal } from './cmp/Modal';
import { Link } from 'react-router-dom';
import { useFireAuthContext } from './config/FireAuthContext';
import { useLogoutFire } from './config/firebaseAuthHooks';

function App() {
  const [toys, setToys] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentEditToy, setCurrentEditToy] = useState(null)
  const { userFire } = useFireAuthContext()
  const userId = userFire?.uid
  const { logout } = useLogoutFire(auth)
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

  const greetUser = () =>{
    let greet = ''
    const index = userFire.email.indexOf('@')
    greet += userFire.email.slice(0, index)
    return greet
  }

  return (
    <div className="relative">
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} currentEditToy={currentEditToy} />}
      <main
        className={`bg-zinc-200 z-0 h-screen ${isModalOpen ? "blur-sm" : "blur-none"}`}>
        <div className='flex gap-5 justify-center items-center pt-4'>
          <h1 className="text-4xl">Firestore Application🔥</h1>
          {userFire?.email ?
            <div className='flex gap-5 items-center'>
              <h3 className='text-xl'>Hello: <span className='font-bold capitalize'>{greetUser()}</span></h3>
              <button className='bg-red-400 btn' onClick={async () => window.confirm('Logout from the site?') && logout()}>logout</button>
            </div>
            : <div className='gap-5 flex'>
              <Link className='bg-green-400 btn' to={'/signup'}>singup</Link>
              <Link className='bg-blue-400 btn' to={'/login'}>log in</Link>
            </div>}
        </div>
        <h2 className="text-3xl text-center mt-3">Toys Collection:</h2>
        {!toys ? <div className='text-4xl'>Loading...</div>: <ToyList toys={toys} setIsModalOpen={setIsModalOpen} setCurrentEditToy={setCurrentEditToy} userId={userId}/>} 
        <Form userId={userId}/>
      </main>
    </div>

  )
}

export default App
