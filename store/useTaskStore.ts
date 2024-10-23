import { create } from 'zustand'
import { createClient } from '@/_utils/supabase/client'
import { Task, TodoState } from '@/_types/taskType'
import { addHours } from 'date-fns'

export const useTaskStore = create<TodoState>(set => ({
  tasks: [],
  currentPage: 0,
  hasMore: true,

  fetchTaskToday: async (page: number = 0) => {
    const startDayTime = new Date()
    startDayTime.setHours(0, 0, 0, 0) 
    startDayTime.setHours(startDayTime.getHours() + 9) 

    const endDayTime = new Date()
    endDayTime.setHours(23, 59, 59, 999)
    endDayTime.setHours(endDayTime.getHours() + 9)

    const supabase = createClient()
    const { data, error } = await supabase
      .from('todolist')
      .select('*')
      .gte('due_date', startDayTime.toISOString())
      .lte('due_date', endDayTime.toISOString())
      .range(page * 20, (page + 1) * 20 - 1)

    if (error) {
      console.error('Fetching today task ERROR:', error)
      return
    }

    if (data) {
      const tasks: Task[] = data as Task[]

      set(state => ({
        tasks: page === 0 ? tasks : [...state.tasks, ...tasks],
        hasMore: tasks.length > 0 && tasks.length === 20,
        currentPage: page,
      }))
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
      set({ tasks: data as Task[] })
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
      set({ tasks: data as Task[] }) 
    }
  },

  createTask: async (title: string, detail: string | null, userId: string, dueDate: Date | null) => {
    const kstDueDate = dueDate ? addHours(new Date(dueDate), 9) : null
    const supabase = createClient()
    const { data, error } = await supabase
      .from('todolist')
      .insert([{ todo_title: title, todo_detail: detail, user_id: userId, due_date: kstDueDate?.toISOString() }])
      .select()

    if (error) {
      console.error('Error adding task: ' + error.message)
    } else {
      set(state => ({ tasks: [...state.tasks, ...(data as Task[])] }))
    }
  },
  editTask: async (id: number, title: string, detail: string) => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('todolist')
      .update({ todo_title: title, todo_detail: detail })
      .eq('todo_id', id)
      .select()

    if (error) {
      console.error('Error editing task: ' + error.message)
    } else if (data && data.length > 0) {

      const updatedTask: Task = {
        todo_id: data[0].todo_id,
        todo_title: data[0].todo_title,
        todo_detail: data[0].todo_detail || '', 
        user_id: data[0].user_id,
        due_date: data[0].due_date,
        created_at: data[0].created_at,
      }

      set(state => ({
        tasks: state.tasks.map(task => (task.todo_id === id ? updatedTask : task)),
      }))
    }
  },

  deleteTask: async (id: number) => {
    const supabase = createClient()
    const { error } = await supabase.from('todolist').delete().eq('todo_id', id)

    if (error) {
      console.error('Error removing task: ' + error.message)
    } else {
      set(state => ({ tasks: state.tasks.filter(task => task.todo_id !== id) }))
    }
  },
}))