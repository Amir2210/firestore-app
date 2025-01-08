import { useEffect, useState } from 'react'
import { useFireAuthContext } from '../config/FireAuthContext'
export function FilterToy() {
  const [inputValue, setInputValue] = useState('')
  const [debouncedInputValue, setDebouncedInputValue] = useState("")
  const { isDarkMode, setToyFilter } = useFireAuthContext()
  const handleInputChange = (event) => {
    setInputValue(event.target.value)

  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue)
      setToyFilter(debouncedInputValue)
    }, 500)
    return () => clearTimeout(timeoutId);
  }, [inputValue, 500, debouncedInputValue]);
  return (
    <div className='my-2'>
      <label className={`block  font-semibold mb-2 ${isDarkMode ? 'text-zinc-200' : 'text-black'}`} htmlFor="filter">Search Toy:</label>
      <input id='filter' className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 duration-200 focus:ring-blue-500 focus:border-blue-500" type="text" value={inputValue} onChange={handleInputChange} />
    </div>
  )
}
