import { collection, endAt, getDocs, limit, orderBy, query, startAt, startAfter, getDoc, doc } from 'firebase/firestore'
import { auth, dbFireStore } from './config/firebase'
import { useEffect, useState } from 'react'
import { ToyList } from './cmp/toysList';
import { Modal } from './cmp/Modal';
import { Link } from 'react-router-dom';
import { useFireAuthContext } from './config/FireAuthContext';
import { useLogoutFire } from './config/firebaseAuthHooks';
import { FilterToy } from './cmp/FilterToy';
import { DarkModebtn } from './cmp/DarkModebtn';
import { ShowFavoriteToys } from './cmp/ShowFavoriteToys';

function App() {
  const [toys, setToys] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentEditToy, setCurrentEditToy] = useState(null)
  const { userFire, toyFilter, isDarkMode, isFavoriteShow, favoriteToys } = useFireAuthContext()
  const userId = userFire?.uid
  const { logout } = useLogoutFire(auth)
  useEffect(() => {
    getFireStoreData()
  }, [toyFilter])
  // console.log('favoriteToys:', favoriteToys)

  const getFireStoreData = async () => {
    try {
      const ref = collection(dbFireStore, "toys")
      //filter toy
      const q = toyFilter
        ? query(
          ref,
          orderBy("name"),
          startAt(toyFilter),
          endAt(toyFilter + "\uf8ff")
        )
        : query(ref, orderBy("_id", "desc"))
      const snapshot = await getDocs(q)
      // console.log(snapshot.docs)
      const toysArray = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      setToys(toysArray)
    } catch (error) {
      alert('there was an Error try again')
      console.log(error, 'ERROR!')
    }
  }

  function getNameFromEmail() {
    let greet = ''
    const index = userFire.email.indexOf('@')
    greet += userFire.email.slice(0, index)
    return greet
  }

  function renderToys() {
    if (isFavoriteShow) {
      return (<ToyList toys={toys} setIsModalOpen={setIsModalOpen} setCurrentEditToy={setCurrentEditToy} userId={userId} getFireStoreData={getFireStoreData} />)
    }
    if (!toys.length) {
      return (<div className={`text-4xl ${isDarkMode ? 'text-zinc-200' : 'text-black'}`}>No Toys Found...</div>)
    } else {
      return (
        <ToyList toys={toys} setIsModalOpen={setIsModalOpen} setCurrentEditToy={setCurrentEditToy} userId={userId} getFireStoreData={getFireStoreData} />
      )
    }
  }

  return (
    <div className="relative">
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} currentEditToy={currentEditToy} userId={userId} getFireStoreData={getFireStoreData} />}
      <main
        className={`${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-200'} z-0 min-h-screen px-3 mx-auto duration-700 ease-in ${isModalOpen ? "blur-sm" : "blur-none"}`}>
        <div className='flex flex-col gap-5 justify-center items-center pt-4'>
          <h1 className={`text-3xl ${isDarkMode ? 'text-zinc-200' : 'text-black'}`}>Firestore Application🔥</h1>
          {userFire?.email ?
            <div className='flex flex-col sm:flex-row gap-5 items-center'>
              <div className='flex-row flex items-center gap-5'>
                <h3 className={`text-xl ${isDarkMode ? 'text-zinc-200' : 'text-black'}`}>Hello: <span className='font-bold capitalize'>{getNameFromEmail()}</span></h3>
                <button className='bg-red-400 btn' onClick={async () => window.confirm('Logout from the site?') && logout()}>logout</button>
              </div>
              <div className='flex flex-col sm:flex-row items-center gap-5'>
                <div className='flex flex-row gap-5'>
                  <Link className='bg-emerald-400 btn' to={'/addToy'}>Add a new Toy</Link>
                  <DarkModebtn />
                </div>
                <ShowFavoriteToys />
              </div>
            </div>
            : <div className='gap-5 flex'>
              <Link className='bg-green-400 btn' to={'/signup'}>singup</Link>
              <Link className='bg-blue-400 btn' to={'/login'}>log in</Link>
              <DarkModebtn />
            </div>}
        </div>
        {!isFavoriteShow ? <FilterToy /> : null}
        {renderToys()}
      </main>
    </div>

  )
}

export default App
