import useModalStore from '@/store/useModalStore'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Modal = ({ children }: Props) => {
  const { toggleModal } = useModalStore()

  return (
    <div>
      <button onClick={toggleModal} type="button">
        X
      </button>
      <div>
        <h1>Create tasks!</h1>
        <div> {children}</div>
      </div>
    </div>
  )
}

export default Modal
