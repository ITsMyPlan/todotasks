import { create } from 'zustand'
// _types로 나중에 이동
type Store = {
  show: boolean
  toggleModal: () => void
}

const useModalStore = create<Store>()(set => ({
  show: false,
  toggleModal: () => set(state => ({ show: !state.show })),
}))

export default useModalStore
