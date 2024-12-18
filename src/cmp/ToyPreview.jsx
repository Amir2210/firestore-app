import { IoTrashBin } from "react-icons/io5";

export function ToyPreview({ toy }) {
  return (
    <li className='flex items-center gap-5 capitalize bg-yellow-50 p-4 text-xl rounded-sm mb-4'>
      <h1>toy name: {toy.name}</h1>
      <h2>price: <span className='font-bold'>{toy.price}₪ NIS</span></h2>
      <h3>info:  {toy.info}</h3>
      <div className='bg-zinc-200 flex items-center'>
        <button className='text-red-600'><IoTrashBin /></button>
      </div>
    </li>
  )
}