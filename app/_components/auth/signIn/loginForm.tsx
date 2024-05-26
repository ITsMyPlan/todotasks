'use client'
import { FormEvent, useState } from 'react'
import { login } from './actions'

type SignupForm = {
  email: string
  password: string
}

export default function LoginForm() {

  const [form, setForm] = useState<SignupForm>({
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
  
  return (
<form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        placeholder="Email"
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        placeholder="Must have at least 8 characters"
        required
      />
      <button type="submit">Login</button>
    </form>
  )
}