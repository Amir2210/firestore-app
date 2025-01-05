import { ToyPreview } from './ToyPreview';

export function ToyList({ toys, setIsModalOpen, setCurrentEditToy, userId, getFireStoreData }) {
  return (
    <ul className='flex flex-col items-center mt-4'>
      {toys.map((toy) => {
        return (
          <ToyPreview key={toy.id} toy={toy} setIsModalOpen={setIsModalOpen} setCurrentEditToy={setCurrentEditToy} userId={userId} getFireStoreData={getFireStoreData} />
        )
      })}
    </ul>
  )
}