import Sidebar from '@/_components/layout/Sidebar'
import SignupForm from '../_components/auth/signUp/signupForm'

export default function SignupPage() {
  return (
    <div className="container flex h-screen mx-[21px] my-[22px]">
      <Sidebar />
      <div className="box-border ml-[10px] w-screen">
        <p>signup</p>
        <SignupForm />
      </div>
    </div>
  )
}
