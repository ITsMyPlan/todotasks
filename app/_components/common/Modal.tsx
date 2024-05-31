import useModalStore from '@/store/useModalStore'
import { ModalProps } from '@/_types/modalState'

const Modal = ({ children }: ModalProps) => {
  const { show, toggleModal } = useModalStore(state => ({
    show: state.show,
    toggleModal: state.toggleModal,
  }))
  if (!show) return null

  return (
    <div>
      <p>Tasks</p>
      <button type="button" onClick={toggleModal}>
        X
      </button>
      <div>{children}</div>
    </div>
  )
}

export default Modal
