import { create } from 'zustand'
import { createClient } from '@/_utils/supabase/client'
import { TodoState } from '@/_types/taskType'

export const useTaskStore = create<TodoState>(set => ({
  tasks: [],
  fetchTasks: async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from('todolist').select()

    if (error) {
      console.error('Fetching todolist ERROR:', error)
    } else {
      set({ tasks: data })
    }
  },
  createTask: async (title, detail, userId) => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('todolist')
      .insert([{ todo_title: title, todo_detail: detail, user_id: userId }])
      .select()

    if (error) {
      console.error('Error adding task: ' + error.message)
    } else {
      set(state => ({ tasks: [...state.tasks, ...data] }))
    }
  },
  editTask: async (id, title, detail) => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('todolist')
      .update({ todo_title: title, todo_detail: detail })
      .eq('todo_id', id)
      .select()

    if (error) {
      console.error('Error editing task: ' + error.message)
    } else {
      set(state => ({ tasks: state.tasks.map(task => (task.todo_id === id ? data[0] : task)) }))
    }
  },
  deleteTask: async id => {
    const supabase = createClient()
    const { error } = await supabase.from('todolist').delete().eq('todo_id', id)

    if (error) {
      console.error('Error removing task: ' + error.message)
    } else {
      set(state => ({ tasks: state.tasks.filter(task => task.todo_id !== id) }))
    }
  },
}))
