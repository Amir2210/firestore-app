import { useEffect, useState } from 'react'
import { useFireAuthContext } from '../config/FireAuthContext'
export function FilterToy() {
  const [inputValue, setInputValue] = useState('')
  const [debouncedInputValue, setDebouncedInputValue] = useState("")
  const { toyFilter, setToyFilter } = useFireAuthContext()
  const handleInputChange = (event) => {
    setInputValue(event.target.value)

  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue)
      setToyFilter(debouncedInputValue)
    }, 1500)
    return () => clearTimeout(timeoutId);
  }, [inputValue, 1500, debouncedInputValue]);
  console.log('debouncedInputValue:', debouncedInputValue)
  return (
    <input type="text" value={inputValue} onChange={handleInputChange} />
  )
}
