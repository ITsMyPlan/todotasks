export interface Task {
  id: number
  title: string
  detail: string
}

export interface TaskState {
  tasks: Task[]
  addTask: (title: string, detail: string) => void
}
