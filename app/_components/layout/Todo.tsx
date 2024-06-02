'use client'
import { useState } from 'react'
import Modal from '@/_components/common/Modal'
import { useViewTaskModalState, useModalActions } from '@/store/useModalStore'
import useTaskStore from '@/store/useTaskStore'
import { Task } from '@/_types/taskType'

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
    <div className="relative ml-[10px] z-0 w-100% container h-100%">
      <p>Today</p>
      <div className="border-b-4 border-lightGray/30 my-[1%]">Tasks</div>
      <button onClick={addTaskBtn}>+ Add new tasks</button>
      <div>
        {tasks.map(task => (
          <div key={task.id}>
            <span>{task.title}</span>
            <button onClick={() => viewTaskBtn(task)}>View Details</button>
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
