import { create } from 'zustand'
import { ModalState } from '@/_types/modalState'

const useModalStore = create<ModalState>(set => ({
  show: false,
  toggleModal: () => set(state => ({ show: !state.show })),
}))

export default useModalStore
