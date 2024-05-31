import { create } from 'zustand'
import { TaskState } from '@/_types/taskType'

const useTaskStore = create<TaskState>(set => ({
  tasks: [],
  addTask: (title, detail) =>
    set(state => ({
      tasks: [...state.tasks, { id: Date.now(), title, detail }],
    })),
}))

export default useTaskStore
