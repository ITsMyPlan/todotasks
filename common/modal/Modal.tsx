import { useViewTaskModalState, useModalActions, useAddTaskModalState } from '@/store/useModalState'
import { ModalProps } from '@/_types/modalType'

import Image from 'next/image'
import X from '@/public/icons/x.png'

const Modal = ({ children }: ModalProps) => {
  const addTaskOn = useAddTaskModalState()
  const viewTaskOn = useViewTaskModalState()
  const { changeModalState } = useModalActions()

  if (!addTaskOn && !viewTaskOn) return null

  return (
    <div className="max-sm:w-full min-w-80 absolute h-full bg-gray-100 font-bold z-50 bottom-0 right-0 text-neutral-500 rounded-2xl  px-[27px] py-[22px]">
      <div className="relative w-full h-full">
        <div className="flex justify-between border-b-4 px-[2px] pb-[2px]">
          <div className="font-bold text-[30px]">Task</div>
          <button type="button" onClick={() => changeModalState(addTaskOn ? 'add' : 'view')}>
            <Image src={X} alt="closeButton" style={{ width: 20, height: 20 }} />
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  )
}

export default Modal