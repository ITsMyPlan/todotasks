import useModalStore from '../../../../store/store'

interface Props {
  children: React.ReactNode
}

const Modal = ({ children }: Props) => {
  const { toggleModal } = useModalStore()
  return (
    <div>
      <div className="modal-overlay" onClick={toggleModal}></div>
      <div className="modal-content-container">
        <div className="modal-content">
          <h1>모달테스트</h1>
          {children}
          <button onClick={toggleModal} className="modal-close-button" type="button">
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
