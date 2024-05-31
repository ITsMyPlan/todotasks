'use client'
import useModalStore from "@/store/useModalStore"
import Modal from "@/_components/common/Modal"

export default function Todo() {
   const { show, toggleModal } = useModalStore(state => ({
     show: state.show,
     toggleModal: state.toggleModal,
   }))


  return (
    <div className="box-border ml-[10px] w-screen">
      <p>Today</p>
      <div className="border-b-4 border-lightGray/30 my-[1%]">dd</div>
      <button onClick={toggleModal}>+add new tasks</button>
      {show && <Modal children={undefined} />}
      <div>d</div>
    </div>
  )
}
