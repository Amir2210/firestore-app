import { useFireAuthContext } from '../config/FireAuthContext'
import { IoMdSunny, IoMdMoon } from "react-icons/io";

export function DarkModebtn() {
  const { isDarkMode, toggleDarkMode } = useFireAuthContext()
  return (
    <button onClick={toggleDarkMode} className={`btn duration-700 ease-in ${isDarkMode ? 'bg-yellow-400' : 'bg-blue-800'}`}> {isDarkMode ? <IoMdSunny /> : <IoMdMoon />}</button >
  )
}

