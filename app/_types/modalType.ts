export type TaskType = 'add' | 'view' | 'delete' | 'edit'

export interface ModalState {
  add: boolean
  view: boolean
  delete: boolean
  edit: boolean
  actions: {
    changeModalState: (type: TaskType, value?: boolean) => void
  }
}
export interface ModalProps {
  children: React.ReactNode
}
