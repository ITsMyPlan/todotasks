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
    <div className="fixed sm:inset-0 flex items-center h-full justify-center z-50">
    <div className="absolute right-0 h-full bottom-0 max-sm:w-full w-[480px] overflow-hidden bg-gray-100 font-bold rounded-2xl px-[27px] py-[22px]">
      <div className="relative w-full h-full">
        <div className="flex justify-between border-b-4 px-[2px] pb-[2px]">
          <div className="font-bold text-[30px]">Task</div>
          <button type="button" onClick={() => changeModalState(addTaskOn ? 'add' : 'view')}>
            <Image src={X} alt="closeButton" style={{ width: 20, height: 20 }} />
          </button>
        </div>

        <div className='sm:w-full'>{children}</div>
      </div>
    </div>
    </div>
  )
}

export default Modal
