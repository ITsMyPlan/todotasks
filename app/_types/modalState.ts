export type ModalState = {
  show: boolean
  toggleModal: () => void
}

export interface ModalProps {
  children: React.ReactNode
}
