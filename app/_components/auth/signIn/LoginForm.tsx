'use client'
import { FormEvent, useState } from 'react'
import { login } from './actions'
import { createClient } from '@/_utils/supabase/client'

import Image from 'next/image'
import googleIcon from '@/public/icons/google.png'
import { SigninFormProps } from '@/_types/userType'

export default function LoginForm() {
  const [form, setForm] = useState<SigninFormProps>({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (form.email && form.password) {
      const formData = new FormData()
      formData.append('email', form.email)
      formData.append('password', form.password)
      await login(formData)
    } else {
      alert('이메일과 패스워드 모두 작성해주세요.')
    }
  }

  const handleGoogleLogin = () => {
    const supabase = createClient()
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
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
        <div className="">
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
        </div>
        <div className="">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="off"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            placeholder="Password"
            className="w-full font-semibold border-solid border-2 rounded border-stone-700 mt-[18px] px-[10px] py-[10px]"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full items-center text-[18px] text-slate-50 flex rounded bg-stone-900 py-[12px] mt-[37px] justify-center"
        >
          Login
        </button>
      </form>
    </div>
  )
}
