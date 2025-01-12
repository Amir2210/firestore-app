import { useFireAuthContext } from '../config/FireAuthContext';
import { ToyPreview } from './ToyPreview';

export function ToyList({ toys, setIsModalOpen, setCurrentEditToy, userId, getFireStoreData }) {
  const { isFavoriteShow, favoriteToys } = useFireAuthContext()
  const newToysArray = toys.map((toy1) => {
    const match = favoriteToys.find((toy2) => toy2.id === toy1.id)
    return {
      ...toy1,
      isFavorite: match ? match.isFavorite : toy1.isFavorite
    }
  })
  if (!isFavoriteShow) {
    return (
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center mt-4'>
        {newToysArray.map((toy) => {
          return (
            <ToyPreview key={toy.id} toy={toy} setIsModalOpen={setIsModalOpen} setCurrentEditToy={setCurrentEditToy} userId={userId} getFireStoreData={getFireStoreData} />
          )
        })}
      </ul>
    )
  } else {
    return (
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center mt-4'>
        {favoriteToys.map((toy) => {
          return (
            <ToyPreview key={toy.id} toy={toy} setIsModalOpen={setIsModalOpen} setCurrentEditToy={setCurrentEditToy} userId={userId} getFireStoreData={getFireStoreData} />
          )
        })}
      </ul>
    )
  }
}