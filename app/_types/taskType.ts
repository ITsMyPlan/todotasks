export interface Task {
  todo_id: number
  todo_title: string
  todo_detail: string
  user_id: string
}

export type TodoState = {
  tasks: Task[]
  fetchTaskAll: () => Promise<void>
  fetchTaskToday: () => Promise<void>
  createTask: (title: string, detail: string, userId: string) => Promise<void>
  editTask: (id: number, title: string, detail: string) => Promise<void>
  deleteTask: (id: number) => Promise<void>
}

export interface TaskFormProps {
  initialTitle?: string
  initialDetail?: string
  taskId?: number | null
}