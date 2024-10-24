'use client'
import { FormEvent, useState } from 'react'
import { signup } from './actions'
import { createClient } from '@/_utils/supabase/client'
import { SigninFormProps } from '@/_types/userType'
import { redirect } from 'next/navigation'

import Image from 'next/image'
import googleIcon from '@/public/icons/google.png'

export default function SignupForm() {
  const [form, setForm] = useState<SigninFormProps>({
    email: '',
    password: '',
  })

  const [isChecked, setIsChecked] = useState(false)

  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/
  const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

  const checkingPolicy = () => {
    setIsChecked(true)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    let isValid = true

    if (!emailRegEx.test(form.email)) {
      alert('이메일 양식에 맞게 작성해주세요.')
      isValid = false
    }
    if (!passwordRegEx.test(form.password)) {
      alert('비밀번호는 최소 8자로, 하나 이상의 대소문자, 숫자, 특수문자를 섞어서 작성해주세요.')
      isValid = false
    }
    if (!isChecked) {
      alert('안내 사항을 체크해주셔야 회원가입이 진행됩니다.')
      isValid = false
    }

    if (isValid) {
      const formData = new FormData()
      formData.append('email', form.email)
      formData.append('password', form.password)

      const response = await signup(formData)
      if (response && response.error) {
        alert('이미 존재하는 계정입니다.')
      }
    }
  }

   const handleGoogleLogin = async () => {
     const supabase = createClient()
     const { error } = await supabase.auth.signInWithOAuth({
       provider: 'google',
       options: {
         redirectTo: 'http://localhost:3000/auth/callback',
         queryParams: {
           access_type: 'offline',
           prompt: 'consent',
         },
       },
     })
     if (error) {
       console.error('OAuth login error:', error.message)
       redirect('/signup')
     }
   }


  return (
    <div className="max-sm:w-11/12 w-[338px] flex flex-col items-center justify-center my-[20px]">
      <div className="w-full">
        <button
          onClick={handleGoogleLogin}
          className="w-full justify-center items-center flex border-solid border-2 rounded border-stone-700 py-[16px]"
        >
          <Image src={googleIcon} alt="google logo" width={22} height={22} />
          <div className="text-[16px] font-semibold pl-[10px]">Continue with Google</div>
        </button>
      </div>

      <p className="my-[20px] text-[13px] text-gray-900">or</p>

      <form onSubmit={handleSubmit} className="w-full grid content-normal">
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="w-full font-semibold border-solid border-2 rounded border-stone-700 px-[10px] py-[10px]"
          required
        />

        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
          minLength={8}
          autoComplete="off"
          className="w-full font-semibold border-solid border-2 rounded border-stone-700 mt-[18px] px-[10px] py-[10px]"
          required
        />

        <div className="flex items-center justify-center my-[10px] px-[3px]">
          <input type="checkbox" id="policy" name="policy" onClick={checkingPolicy} required />
          <label htmlFor="policy" className="ml-[10px] text-[13px] font-semibold">
            By clicking ”Create Account” or “Continue with Google”, you agree to the TodoTasks and Privacy Policy.
          </label>
        </div>
        <button
          type="submit"
          className="w-full items-center text-[18px] text-slate-50 flex rounded bg-stone-900 py-[12px]  justify-center"
        >
          Sign up
        </button>
      </form>
    </div>
  )
}
