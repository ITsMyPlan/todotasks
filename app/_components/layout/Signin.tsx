'use client'

import LoginForm from '@/_components/auth/signIn/LoginForm'
import SignupForm from '@/_components/auth/signUp/SignupForm'
import { useState } from 'react'

export default function Signin() {
  const [isClicked, setIsClicked] = useState(false)

  function goSignup() {
    setIsClicked(true)
  }

  function goSignin() {
    setIsClicked(false)
  }
  return (
    <div className="ml-[10px] overflow-auto container w-11/12 md:w-full h-full">
      <div className="text-[30px] font-bold border-b-4 border-gray-200 py-[12px] pl-[10px]">Welcome!</div>
      {isClicked === true ? (
        <div className=" my-[20px] w-full flex flex-col justify-center items-center ">
          <SignupForm />
          <div className="text-[15px]">
            Back to
            <button type="button" onClick={goSignin} className="text-blue-500">
              Login
            </button>
          </div>
        </div>
      ) : (
        <div className=" my-[20px] w-full flex flex-col justify-center items-center ">
          <LoginForm />
          <div className="text-[15px]">
            No account?
            <button type="button" onClick={goSignup} className="text-blue-500">
              Create on
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
