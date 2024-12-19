import { useRef } from 'react'
import { useLoginFire } from '../config/firebaseAuthHooks'
import { auth } from '../config/firebase'
export function Login() {
  const mailRef = useRef(null)
  const passwordRef = useRef(null)
  const { error, login } = useLoginFire(auth)
  const onSub = async (e) => {
    try {
      e.preventDefault()
      const email = mailRef.current.value
      const password = passwordRef.current.value
      const data = await login(email, password)
      if (data.email) {
        alert('Success Login!')
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
        <h2 className='text-red-500'>{error}</h2>
        <button>Login</button>
      </form>

    </main>
  )
}