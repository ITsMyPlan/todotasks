import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '_utils/supabase/client'

export default async function logout() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('로그아웃 중 오류 발생:', error.message)
  } else {
    revalidatePath('/', 'layout')
    redirect('/')
  }
}
