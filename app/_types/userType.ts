export type UserState = {
  user: any
  fetchUser: () => Promise<void>
}

export type SigninFormProps = {
  email: string
  password: string
}
