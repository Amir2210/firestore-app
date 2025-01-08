import { ToyPreview } from './ToyPreview';

export function ToyList({ toys, setIsModalOpen, setCurrentEditToy, userId, getFireStoreData }) {
  return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center mt-4'>
      {toys.map((toy) => {
        return (
          <ToyPreview key={toy.id} toy={toy} setIsModalOpen={setIsModalOpen} setCurrentEditToy={setCurrentEditToy} userId={userId} getFireStoreData={getFireStoreData} />
        )
      })}
    </ul>
  )
}