import { useState } from 'react'
import useTaskStore from '@/store/useTaskStore'
import { useAddTaskModalState, useViewTaskModalState, useModalActions } from '@/store/useModalStore'
import { ModalProps } from '@/_types/modalType'
import X from '@/public/icons/x.png'
import AddIconWhite from '@/public/icons/whiteplus.png'

import Image from 'next/image'

const Modal = ({ children }: ModalProps) => {
  const addTaskOn = useAddTaskModalState()
  const viewTaskOn = useViewTaskModalState()
  const { changeModalState } = useModalActions()

  const addTask = useTaskStore(state => state.addTask)

  const [title, setTitle] = useState('')
  const [detail, setDetail] = useState('')

  const handleAddTask = () => {
    addTask(title, detail)
    setTitle('')
    setDetail('')
    changeModalState('add')
  }

  if (!addTaskOn && !viewTaskOn) return null

  return (
    <div className="absolute h-full bg-gray-100 font-bold z-50 bottom-0 right-0 text-neutral-500 rounded-2xl w-[482px] min-w-[482px] px-[27px] py-[22px]">
      <div className="relative h-full">
        <div className="flex justify-between border-b-4 border-lightGray/70 px-[2px] pb-[2px]">
          <div className="font-bold text-[30px]">Task</div>
          <button type="button" onClick={() => changeModalState(addTaskOn ? 'add' : 'view')}>
            <Image src={X} alt="closeButton" style={{ width: 20, height: 20 }} />
          </button>
        </div>

        {addTaskOn && (
          <div className="">
            <div className="">
              <div className="border-b-4 border-lightGray/70 py-[8px]">
                <input
                  type="text"
                  placeholder="Task"
                  value={title}
                  minLength={1}
                  maxLength={50}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full h-[30px] bg-transparent"
                />
              </div>
              <div className="border-b-4 border-lightGray/70 py-[10px]">
                <textarea
                  placeholder="Description"
                  value={detail}
                  minLength={0}
                  maxLength={150}
                  onChange={e => setDetail(e.target.value)}
                  className="outline-none resize-none w-full h-[25vh] bg-transparent"
                />
              </div>

              <button
                type="button"
                onClick={handleAddTask}
                className="absolute bottom-0 bg-gray-300 w-full h-[60px] rounded-xl"
              >
                <div className="flex justify-center items-center">
                  <Image src={AddIconWhite} alt="addIcon" style={{ width: 20, height: 20 }} />
                </div>
              </button>
            </div>
          </div>
        )}
        {viewTaskOn && <div>{children}</div>}
      </div>
    </div>
  )
}

export default Modal
