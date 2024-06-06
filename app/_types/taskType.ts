export interface Task {
  todo_id: number
  todo_title: string
  todo_detail: string
  user_id: string
}

export type TodoState = {
  tasks: Task[]
  fetchTasks: () => Promise<void>
  createTask: (title: string, detail: string, userId: string) => Promise<void>
  editTask: (id: number, title: string, detail: string) => Promise<void>
  deleteTask: (id: number) => Promise<void>
}
