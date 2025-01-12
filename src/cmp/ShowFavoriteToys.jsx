import { useFireAuthContext } from '../config/FireAuthContext'

export function ShowFavoriteToys() {
  const { isFavoriteShow, setIsFavoriteShow } = useFireAuthContext()
  return (
    <button onClick={() => setIsFavoriteShow(!isFavoriteShow)} className='btn bg-purple-400'>{isFavoriteShow ? 'Show all Toys' : ' Show favorite Toys'}</button>
  )
}