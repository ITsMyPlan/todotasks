'use client'
import { useEffect, useState } from 'react'
import Modal from '@/common/modal/Modal'
import { useViewTaskModalState, useModalActions, useEditTaskModalState } from '@/store/useModalState'
import TaskForm from '@/common/modal/TaskForm'
import { useTaskStore } from '@/store/useTaskStore'
import { Task } from '@/_types/taskType'

import Image from 'next/image'
import ArrowBtn from '@/public/icons/arrow2.png'
import RemoveIcon from '@/public/icons/trashcan.png'
import EditIcon from '@/public/icons/editicon.png'



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
    <div className="relative overflow-auto z-0 w-full container h-full px-[15px]">
      <div className="text-[30px] font-bold border-b-4 border-lightGray py-[12px]">Today</div>

      <div className="border-b-4 border-lightGray px-[4px] py-[4px]">
        <button
          onClick={addTaskBtn}
          className="cursor-pointer bg-gray-100 hover:bg-gray-200 active:bg-gray-200 focus:outline-none rounded-lg px-[10px] py-[4px] w-full flex"
        >
          + Add new tasks
        </button>
      </div>

      <div className="relative ">
        {tasks.map(task => (
          <div key={task.todo_id} className="border-b-4 border-lightGray/30 px-[4px] py-[4px] w-full">
            <button onClick={() => viewTaskBtn(task)} className="flex items-center justify-between w-full">
              <div className="px-[10px] py-[4px] w-full cursor-pointer hover:bg-gray-100 active:bg-gray-100 focus:outline-none rounded-lg">
                <div className="flex items-center justify-between">
                  <input type="checkbox" className="absolute left-0 ml-[10px]" />
                  <div className="flex items-center px-[20px]">
                    <div className="truncate">{task.todo_title}</div>
                    <Image
                      src={ArrowBtn}
                      alt="view more"
                      style={{ width: 15, height: 12 }}
                      className="absolute right-0 mr-[10px]"
                    />
                  </div>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>

      <Modal>
        {viewTask && selectedTask ? (
          <div className="">
            {editTask ? (
              <TaskForm
                initialTitle={selectedTask.todo_title}
                initialDetail={selectedTask.todo_detail}
                taskId={selectedTask.todo_id}
              />
            ) : (
              <div className="">
                <div className="">
                  <div className="w-full h-10 border-b-4 py-[8px]">{selectedTask.todo_title}</div>
                  <div className="h-full pt-[8px]">{selectedTask.todo_detail}</div>
                </div>

                <div className="absolute bottom-0 h-[60px] w-full flex justify-between items-center">
                  <button
                    onClick={() => deleteTaskBtn(selectedTask.todo_id)}
                    className="relative h-full bg-gray-200 hover:bg-gray-300 active:bg-gray-300 rounded-md w-1/2 mr-[5px]"
                  >
                    <Image src={RemoveIcon} alt="delete button" style={{ width: 22, height: 27.5 }} className="insetcenter" />
                  </button>

                  <button
                    onClick={editTaskBtn}
                    className="relative h-full  bg-gray-200 hover:bg-gray-300 active:bg-gray-300 rounded-md w-1/2 "
                  >
                    <Image src={EditIcon} alt="edit button" style={{ width: 30, height: 30 }} className="insetcenter" />
                  </button>
                </div>
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
