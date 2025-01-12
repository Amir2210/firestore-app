import { useRef } from 'react'
import { useLoginFire } from '../config/firebaseAuthHooks'
import { auth } from '../config/firebase'
import { useNavigate } from 'react-router-dom'
export function Login() {
  const mailRef = useRef(null)
  const passwordRef = useRef(null)
  const { error, login } = useLoginFire(auth)
  const navigate = useNavigate()
  const onSub = async (e) => {
    try {
      e.preventDefault()
      const email = mailRef.current.value
      const password = passwordRef.current.value
      const data = await login(email, password)
      if (data.email) {
        alert('Success Login!')
        navigate('/')
      }
    } catch (error) {
      console.log(error, 'ERROR!')
    }
  }
  return (
    <main className='bg-zinc-200 z-0 h-screen flex flex-col items-center justify-center'>
      <h1 className='text-5xl my-6'>Log in</h1>
      <form onSubmit={onSub} className='flex flex-col items-center py-8  text-3xl'>
        <label htmlFor="email">Email:</label>
        <input ref={mailRef} type="email" className='mx-2' />
        <label htmlFor="password">Password:</label>
        <input ref={passwordRef} type="password" className='mx-2' />
        <h2 className='text-red-500'>{error}</h2>
        <button className='bg-blue-400 p-2 py-3 rounded-md text-white mt-4  shadow-md'>Login</button>
        <button onClick={() => navigate('/')} className='bg-violet-400 p-2 py-3 rounded-md text-white mt-4  shadow-md'>Home Page</button>
      </form>

    </main>
  )
}