import { create } from 'zustand'

// modal open/close 체크 file 1

// modal-create new tasks action file 2
// create, delete, edit, task의 완료 상태를 반환하는 toggle
// toggle=> 특정 id에 해당하는 할 일의 완료 상태를 토글하는 함수
// id 매개변수로 받은 값과 일치하는 할 일의 completed 속성 값을 반전!!!

type Modal = {
    isopen: boolean,
    toggleModal: () => void
}

const useModalStore = create<Modal>()((set) => ({
    isopen: false,
    toggleModal: () => set((state) => ({isopen: !state.isopen})),
}))

export default useModalStore