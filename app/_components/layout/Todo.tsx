'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Modal from '@/common/modal/Modal'
import { useViewTaskModalState, useModalActions, useEditTaskModalState } from '@/store/useModalState'
import TaskForm from '@/common/modal/TaskForm'
import { Task, useTaskStore } from '@/store/useTaskStore'

import X from '@/public/icons/x.png'
import ArrowBtn from '@/public/icons/arrow2.png'

export default function Todo() {
  const viewTask = useViewTaskModalState()
  const editTask = useEditTaskModalState()

  const deleteTask = useTaskStore(state => state.deleteTask)

  const { changeModalState } = useModalActions()

  const tasks = useTaskStore(state => state.tasks)
  const fetchTasks = useTaskStore(state => state.fetchTasks)

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const addTaskBtn = () => {
    setSelectedTask(null)
    changeModalState('add')
  }

  const viewTaskBtn = (task: Task) => {
    console.log(task)
    setSelectedTask(task)
    if (!viewTask) {
      changeModalState('view')
    }
  }
  const deleteTaskBtn = async (id: number) => {
    await deleteTask(id)
    setSelectedTask(null)
    changeModalState('view')
  }

  const editTaskBtn = () => {
    changeModalState('edit')
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
          <div key={task.todo_id} className="border-b-4 border-lightGray/30">
            <div className="flex justify-between">
              <div>{task.todo_title}</div>
              <button onClick={() => viewTaskBtn(task)}>
                <Image src={ArrowBtn} alt="view more" style={{ width: 15, height: 12 }} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal>
        {viewTask && selectedTask ? (
          <div>
            {editTask ? (
              <TaskForm
                initialTitle={selectedTask.todo_title}
                initialDetail={selectedTask.todo_detail}
                taskId={selectedTask.todo_id}
              />
            ) : (
              <div>
                <h2>{selectedTask.todo_title}</h2>
                <p>{selectedTask.todo_detail}</p>
                <button onClick={() => deleteTaskBtn(selectedTask.todo_id)}>
                  <Image src={X} alt="delete button" style={{ width: 15, height: 12 }} />
                </button>
                <button onClick={editTaskBtn}>
                  <Image src={ArrowBtn} alt="edit button" style={{ width: 15, height: 12 }} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <TaskForm />
        )}
      </Modal>
    </div>
  )
}
