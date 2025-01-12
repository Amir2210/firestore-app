import { useRef } from 'react'
import { auth } from '../config/firebase'
import { useSignupFire } from '../config/firebaseAuthHooks'
import { useNavigate } from 'react-router-dom'
export function Signup() {
  const mailRef = useRef(null)
  const passwordRef = useRef(null)
  const { error, signup } = useSignupFire(auth)
  const navigate = useNavigate()

  const onSub = async (e) => {
    try {
      e.preventDefault()
      const email = mailRef.current.value
      const password = passwordRef.current.value
      const data = await signup(email, password)
      if (data.email) {
        alert('Success Signup')
        navigate('/')
      }
    } catch (error) {
      console.log(error, 'ERROR!')
    }
  }
  return (
    <main className='bg-zinc-200 h-screen flex flex-col items-center justify-center'>
      <h1 className='text-5xl my-6'>Signup</h1>
      <form onSubmit={onSub} className='flex flex-col items-center py-8  text-3xl'>
        <label htmlFor="email">Email:</label>
        <input ref={mailRef} type="email" className='mx-2' />
        <label htmlFor="password">Password:</label>
        <input ref={passwordRef} type="password" className='mx-2' />
        <h3 className='text-red-500'>{error}</h3>
        <button className='bg-green-400 p-2 py-3 rounded-md text-white mt-4  shadow-md'>Signup</button>
        <button onClick={() => navigate('/')} className='bg-violet-400 p-2 py-3 rounded-md text-white mt-4  shadow-md'>Back</button>
      </form>

    </main>
  )
}