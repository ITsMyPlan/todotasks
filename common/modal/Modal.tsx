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
    <div className="absolute right-0 h-full bottom-0 max-sm:w-full sm:w-1/3 overflow-hidden bg-gray-100 font-bold rounded-2xl px-[27px] py-[22px]">
      <div className="relative h-full">
        <div className="flex justify-between border-b-4 px-[2px] pb-[2px]">
          <div className="font-bold text-[30px]">Task</div>
          <button type="button" onClick={() => changeModalState(addTaskOn ? 'add' : 'view')}>
            <Image src={X} alt="closeButton" style={{ width: 20, height: 20 }} />
          </button>
        </div>

        <div className='w-full'>{children}</div>
      </div>
    </div>
  )
}

export default Modal
