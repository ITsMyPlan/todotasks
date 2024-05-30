// store/useUserStore.ts
import { create } from 'zustand'
import { createClient } from '@/_utils/supabase/client'
import { UserState } from '@/_types/userState'

export const useUserStore = create<UserState>(set => ({
  user: null,
  fetchUser: async () => {
    const supabase = createClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error) {
      console.error('FetchingUser ERROR:', error)
    }
    set({ user })
  },
}))
