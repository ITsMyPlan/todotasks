import Sidebar from '@/_components/layout/Sidebar'
import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className="container flex h-lvh mx-[21px] my-[22px]">
      <Sidebar />
      <div className="box-border ml-[10px] w-screen">
        <p>Login</p>
        <form>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />
          <button formAction={login}>Log in</button>
          <button formAction={signup}>Sign up</button>
        </form>
      </div>
    </div>
  )
}
