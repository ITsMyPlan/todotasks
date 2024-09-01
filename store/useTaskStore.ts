import { create } from 'zustand'
import { createClient } from '@/_utils/supabase/client'
import { TodoState } from '@/_types/taskType'
import { addHours } from 'date-fns'

export const useTaskStore = create<TodoState>(set => ({
  tasks: [],

  fetchTaskToday: async () => {
    const startDayTime = new Date()
    startDayTime.setHours(0, 0, 0, 0)

    const endDayTime = new Date()
    endDayTime.setHours(23, 59, 59, 999)

    const supabase = createClient()
    const { data, error } = await supabase
      .from('todolist')
      .select('*')
      .gte('due_date', startDayTime.toISOString())
      .lte('due_date', endDayTime.toISOString())

    if (error) {
      console.error('Fetching today task ERROR:', error)
    } else {
      set({ tasks: data })
    }
  },
  fetchTaskSelected: async (selectedDate: Date) => {
    const startDayTime = new Date(selectedDate)
    startDayTime.setHours(0, 0, 0, 0)

    const endDayTime = new Date(selectedDate)
    endDayTime.setHours(23, 59, 59, 999)

    const supabase = createClient()
    const { data, error } = await supabase
      .from('todolist')
      .select('*')
      .gte('due_date', startDayTime.toISOString())
      .lte('due_date', endDayTime.toISOString())

    if (error) {
      console.error('Fetching selected date task ERROR:', error)
    } else {
      set({ tasks: data })
    }
  },
  fetchTaskMonth: async (selectedDate: Date) => {
    const startDayTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
    const endDayTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0)

    const supabase = createClient()
    const { data, error } = await supabase
      .from('todolist')
      .select('*')
      .gte('due_date', startDayTime.toISOString())
      .lte('due_date', endDayTime.toISOString())

    if (error) {
      console.error('Fetching selected MONTH ERROR:', error)
    } else {
      set({ tasks: data })
    }
  },
  createTask: async (title, detail, userId, dueDate) => {
    const kstDueDate = addHours(new Date(dueDate), 9)
    const supabase = createClient()
    const { data, error } = await supabase
      .from('todolist')
      .insert([{ todo_title: title, todo_detail: detail, user_id: userId, due_date: kstDueDate.toISOString() }])
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
