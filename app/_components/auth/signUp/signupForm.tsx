'use client'
import { FormEvent, useState } from 'react'
import { signup } from './actions'
import Image from 'next/image'
import googleIcon from '../../../../public/icons/googleIcon.png'
import { createClient } from '@/_utils/supabase/client'

type SignupForm = {
  email: string
  password: string
}

export default function SignupForm() {
  const [form, setForm] = useState<SignupForm>({
    email: '',
    password: '',
  })

  const [emailErr, setEmailErr] = useState<string>('')
  const [passwordErr, setPasswordErr] = useState<string>('')

  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/
  const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/

  const validateEmail = (): boolean => {
    if (!emailRegEx.test(form.email)) {
      setEmailErr('이메일 양식에 맞게 다시 작성해주세요.')
      return false
    } else {
      setEmailErr('')
      return true
    }
  }

  const validatePassword = (): boolean => {
    if (!passwordRegEx.test(form.password)) {
      setPasswordErr('비밀번호 양식에 맞게 다시 작성해주세요.')
      return false
    } else {
      setPasswordErr('')
      return true
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const isEmailValid = validateEmail()
    const isPasswordValid = validatePassword()
    if (isEmailValid && isPasswordValid) {
      const formData = new FormData()
      formData.append('email', form.email)
      formData.append('password', form.password)
      await signup(formData)
    } else {
      alert('양식에 맞게 작성해주세요.')
    }
  }

  const handleGoogleLogin = () => {
    const supabase = createClient()
    supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }
  
  return (
    <div>
      <button onClick={handleGoogleLogin}>
        <Image src={googleIcon} alt="google logo" width={30} height={30} />
        <div>Continue with Google</div>
      </button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          onBlur={validateEmail}
          required
        />
        {emailErr && <p>{emailErr}</p>}

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          placeholder="Must have at least 8 characters"
          onBlur={validatePassword}
          required
        />
        {passwordErr && <p>{passwordErr}</p>}

        <button type="submit">Sign up</button>
      </form>
    </div>
  )
}
