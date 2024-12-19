import { useRef } from 'react'
import { auth } from '../config/firebase'
import { useSignupFire } from '../config/firebaseAuthHooks'
export function Signup() {
  const mailRef = useRef(null)
  const passwordRef = useRef(null)
  const { error, signup } = useSignupFire(auth)

  const onSub = async (e) => {
    try {
      e.preventDefault()
      const email = mailRef.current.value
      const password = passwordRef.current.value
      const data = await signup(email, password)
      if (data.email) {
        alert('Success Signup, now log in!')
      }
    } catch (error) {
      console.log(error, 'ERROR!')
    }
  }
  return (
    <main className='bg-zinc-200 z-0 h-screen'>
      <form onSubmit={onSub}>
        <label htmlFor="email">Email:</label>
        <input ref={mailRef} type="email" />
        <label htmlFor="password">Password:</label>
        <input ref={passwordRef} type="text" />
        <h3 className='text-red-500'>{error}</h3>
        <button>Signup</button>
      </form>

    </main>
  )
}