export interface Task {
  todo_id: number
  todo_title: string
  todo_detail: string
  user_id: string
  due_date: Date
}
export type TodoState = {
  tasks: Task[]
  fetchTaskToday: () => Promise<void>
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