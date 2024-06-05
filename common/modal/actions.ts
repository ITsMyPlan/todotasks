import { createClient } from '@/_utils/supabase/client'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { FormEvent } from 'react'

interface User extends SupabaseUser {}
// 사용자는 사용자 자신의 todolist만 CRUD할 수 있다는 정책을 걸어두면서 using auth.uid() = user_id라고 작성해서 user_id를 확인해야 하기 때문에 user:User 추가
// userType.ts에 id 항목이 없어서 일단 타입을 supabase에서 받아왔는데 이후 수정할 수도 있음

export const createTask = async (
  e: FormEvent,
  title: string,
  detail: string,
  user: User,
  addTask: (title: string, detail: string) => void,
  changeModalState: (type: 'add') => void,
) => {
  const supabase = createClient()
  if (!user) {
    console.error('User is not authenticated!!')
    return
  }
  const { data, error } = await supabase
    .from('todolist')
    .insert([{ todo_title: title, todo_detail: detail, user_id: user.id }])
    .select()

  if (error) {
    alert('Error adding task: ' + error.message)
  }
  if (data) {
    alert('Task added successfully!!!!')
    addTask(title, detail)
    changeModalState('add')
  }
}