import { createClient } from '_utils/supabase/client'

export default async function logout() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('로그아웃 중 오류 발생:', error.message)
  }
  console.log('로그아웃!! 쿠키 삭제됨')
}
