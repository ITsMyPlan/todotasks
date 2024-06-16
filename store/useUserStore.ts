import { create } from 'zustand'
import { createClient } from '@/_utils/supabase/client'
import { UserState } from '@/_types/userType'

export const useUserStore = create<UserState>(set => ({
  user: null,
  isLogin: false,
  fetchUser: async () => {
    const supabase = createClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error) {
      console.error('Fetching User ERROR:', error)
    }
    set({ user })
  },
  checkisLogin: async () => {
    const supabase = createClient()
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()
    if (error) {
      console.error('Check isLogin ERROR:', error)
    }
    if (session) {
      set({ isLogin: true })
      await useUserStore.getState().fetchUser()
    } else {
      set({ isLogin: false })
    }
  },
}))
