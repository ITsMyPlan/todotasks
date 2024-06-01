'use client'
import Sidebar from '@/_components/layout/Sidebar'
import LoginForm from '@/_components/auth/signIn/LoginForm'
import SignupForm from '@/_components/auth/signUp/SignupForm'
import { useState } from 'react'

export default function SignInPage() {
  const [isClicked, setIsClicked] = useState(false)

  function goSignup() {
    setIsClicked(true)
  }

  return (
    <div className="container flex h-screen mx-[21px] my-[22px]">
      <Sidebar />
      <div className="box-border ml-[10px] w-screen">
        {isClicked === true ? (
          <div>
            <p>signup</p>
            <SignupForm />
          </div>
        ) : (
          <div>
            <p>Login</p>
            <LoginForm />
            <button type="button" onClick={goSignup}>
              Create New Account
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
