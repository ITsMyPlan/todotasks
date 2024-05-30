'use client'
import Modal from "../common/modal"
import useModalStore from "@/store/useModalStore"

export default function Todo() {
  // 모달 컴포넌트 받아와서 Modal event로 발생
  // 컴포넌트는 page/action 따로 나누고 open close 상태관리
  // const { isopen, toggleModal } = useModalStore()

  return (
    <div className="box-border ml-[10px] w-screen">
      <p>Today</p>
      <div className="border-b-4 border-lightGray/30 my-[1%]">dd</div>
      <div>
        {/* <Modal isopen={isopen} onRequestClose={toggleModal}>
          +add new tasks
        </Modal> */}
      </div>
      <div>모달 컴포넌트로 created 된 task</div>
    </div>
  )
}
