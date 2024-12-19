import { useRef } from 'react'

export function Login() {
  const mailRef = useRef(null)
  const passwordRef = useRef(null)
  return (
    <main className='bg-zinc-200 z-0 h-screen'>
      <form >
        <label htmlFor="email">Email:</label>
        <input ref={mailRef} type="email" />
        <label htmlFor="password">Password:</label>
        <input ref={passwordRef} type="text" />
        <button>Login</button>
      </form>

    </main>
  )
}