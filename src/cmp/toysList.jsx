import { ToyPreview } from './ToyPreview';

export function ToyList({ toys, openModal }) {
  return (
    <ul className='flex flex-col items-center mt-4'>
      {toys.map((toy) => {
        return (
          <ToyPreview key={toy.id} toy={toy} openModal={openModal} />
        )
      })}
    </ul>
  )
}