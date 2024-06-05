'use client'
import { useState } from 'react'
import Image from 'next/image'
import Modal from '@/common/modal/Modal'
import { useViewTaskModalState, useModalActions } from '@/store/useModalStore'
import useTaskStore from '@/store/useTaskStore'
import { Task } from '@/_types/taskType'
import ArrowBtn from '@/public/icons/arrow2.png'

export default function Todo() {
  const viewTask = useViewTaskModalState()
  const { changeModalState } = useModalActions()

  const tasks = useTaskStore(state => state.tasks)

  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const addTaskBtn = () => {
    setSelectedTask(null)
    changeModalState('add')
  }

  const viewTaskBtn= (task: Task) => {
    setSelectedTask(task)
    changeModalState('view')
  }

  return (
    <div className="relative ml-[10px] overflow-auto z-0 w-100% container h-100%">
      <p>Today</p>
      <div className="border-b-4 border-lightGray/30 my-[1%]">Tasks</div>
      <div className="border-b-4 border-lightGray">
        <button onClick={addTaskBtn}>+ Add new tasks</button>
      </div>
      <div className="">
        {tasks.map(task => (
          <div key={task.id} className="border-b-4 border-lightGray/30">
            <div className="flex justify-between">
              <span>{task.title}</span>
              <button onClick={() => viewTaskBtn(task)}>
                <Image src={ArrowBtn} alt="view more" style={{ width: 15, height: 12 }} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal>
        {viewTask && selectedTask && (
          <div>
            <h2>{selectedTask.title}</h2>
            <p>{selectedTask.detail}</p>
          </div>
        )}
      </Modal>
    </div>
  )
}
