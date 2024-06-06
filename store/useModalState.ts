import { create } from 'zustand'
import { ModalState, TaskType } from '@/_types/modalType'

const useModalStore = create<ModalState>(set => ({
  add: false,
  view: false,
  delete: false,
  edit: false,
  actions: {
    changeModalState: (type: TaskType) => {
     set(state => ({ ...state, [type]: !state[type] }))
    },
  },
}))

export default useModalStore

export const useModalActions = () => useModalStore(state => state.actions)
export const useAddTaskModalState = () => useModalStore(state => state.add)
export const useViewTaskModalState = () => useModalStore(state => state.view)
export const useDeleteTaskModalState = () => useModalStore(state => state.delete)
export const useEditTaskModalState = () => useModalStore(state => state.edit)
