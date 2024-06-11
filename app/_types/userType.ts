export type UserState = {
  checkisLogin: any
  user: any
  isLogin: boolean
  fetchUser: () => Promise<void>
}

export type SigninFormProps = {
  email: string
  password: string
}
