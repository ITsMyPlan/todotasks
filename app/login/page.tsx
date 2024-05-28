import Sidebar from '@/_components/layout/Sidebar'
import LoginForm from '@/_components/auth/signIn/loginForm'

export default function LoginPage() {
  return (
    <div className="container flex h-screen mx-[21px] my-[22px]">
      <Sidebar />
      <div className="box-border ml-[10px] w-screen">
        <p>Login</p>
        <LoginForm />
      </div>
    </div>
  )
}
