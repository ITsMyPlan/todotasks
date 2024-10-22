export type Task = {
  created_at: string 
  due_date: string
  todo_detail: string | null
  todo_id: number
  todo_title: string
  user_id: string
}

export type TodoState = {
  tasks: Task[]
  currentPage: number
  hasMore: boolean
  fetchTaskToday: (page?: number) => Promise<void>
  fetchTaskSelected: (selectedDate: Date) => Promise<void>
  fetchTaskMonth: (selectedDate: Date) => Promise<void>
  createTask: (title: string, detail: string, userId: string, dueDate: Date) => Promise<void>
  editTask: (id: number, title: string, detail: string) => Promise<void>
  deleteTask: (id: number) => Promise<void>
}
export interface TaskFormProps {
  initialTitle?: string
  initialDetail?: string
  taskId?: number | null
  dueDate?: Date 
}