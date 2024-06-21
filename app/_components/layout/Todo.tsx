'use client'
import React from 'react'
import { useCallback, useEffect, useState } from 'react'
import Modal from '@/common/modal/Modal'
import { useViewTaskModalState, useModalActions, useEditTaskModalState } from '@/store/useModalState'
import TaskForm from '@/common/modal/TaskForm'
import { useTaskStore } from '@/store/useTaskStore'
import { Task } from '@/_types/taskType'

import Image from 'next/image'
import RemoveIcon from '@/public/icons/trashcan.png'
import EditIcon from '@/public/icons/editicon.png'
import TodoItem from './TodoItem'

const Todo = () => {
  const viewTask = useViewTaskModalState()
  const editTask = useEditTaskModalState()

  const deleteTask = useTaskStore(state => state.deleteTask)
  const { changeModalState } = useModalActions()

  // tasks fetching (whole task)
  // const tasks = useTaskStore(state => state.tasks)
  // const fetchTaskAll = useTaskStore(state => state.fetchTaskAll)

  // useEffect(() => {
  //   fetchTaskAll()
  // }, [fetchTaskAll])

  // tasks fetching (today only)
  const tasks = useTaskStore(state => state.tasks)
  const fetchTaskToday = useTaskStore(state => state.fetchTaskToday)

  useEffect(() => {
    fetchTaskToday()
  }, [fetchTaskToday])

  // task crud를 위한 selectedTask, 체크박스 선택을 위한 checkedTask
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [checkedTask, setCheckedTask] = useState<{ [key: string]: boolean }>({})

  // crud 버튼 함수 (addTaskBtn, viewTaskBtn, deleteTaskBtn, editTaskBtn)
  const addTaskBtn = useCallback(() => {
    setSelectedTask(null)
    changeModalState('add', true)
  }, [changeModalState])

  const viewTaskBtn = useCallback(
    (task: Task) => {
      setSelectedTask(task)
      if (!viewTask) {
        changeModalState('view', true)
        console.log(task)
      }
    },
    [viewTask, changeModalState],
  )
  const deleteTaskBtn = useCallback(
    async (id: number) => {
      await deleteTask(id)
      setSelectedTask(null)
      changeModalState('view', false)
    },
    [deleteTask, changeModalState],
  )

  const editTaskBtn = useCallback(() => {
    changeModalState('edit', true)
  }, [changeModalState])

  // checkbox checking
  const checkingBox = (taskId: string, checked: boolean) => {
    setCheckedTask(prev => ({
      ...prev,
      [taskId]: checked,
    }))
  }

  // checkbox removing
  const checkboxDeleteBtn = async () => {
    const toDelete = Object.keys(checkedTask).filter(taskId => checkedTask[taskId])
    await Promise.all(toDelete.map(taskId => deleteTask(Number(taskId))))
    setCheckedTask({})
  }

  return (
    <div className="relative overflow-auto z-0 w-full container h-full mx-[15px]">
      <div className="flex text-[30px] font-bold border-b-4 border-lightGray py-[12px]">Today</div>

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
          <TodoItem
            key={task.todo_id}
            task={task}
            viewTaskBtn={viewTaskBtn}
            checkTask={checkingBox}
            checked={!!checkedTask[task.todo_id.toString()]}
          />
        ))}
      </div>
      <div className="absolute bottom-0 w-full ">
        <button onClick={checkboxDeleteBtn} className=" bg-gray-200 hover:bg-gray-300 active:bg-gray-300 rounded-md">
          <Image src={RemoveIcon} alt="delete button" style={{ width: 22, height: 27.5 }} className="" />
        </button>
      </div>

      <Modal>
        {viewTask && selectedTask ? (
          <div className="max-sm:w-full min-w-80 bg-transparent resize-none h-80">
            {editTask ? (
              <TaskForm
                initialTitle={selectedTask.todo_title}
                initialDetail={selectedTask.todo_detail}
                taskId={selectedTask.todo_id}
              />
            ) : (
              <div>
                <div>
                  <div className="w-full h-10 border-b-4 py-[8px]">{selectedTask.todo_title}</div>
                  <div className="h-full pt-[8px]">{selectedTask.todo_detail}</div>
                </div>

                <div className="absolute bottom-0 h-[60px] w-full flex justify-between items-center">
                  <button
                    onClick={() => deleteTaskBtn(selectedTask.todo_id)}
                    className="relative h-full bg-gray-200 hover:bg-gray-300 active:bg-gray-300 rounded-md w-1/2 mr-[5px]"
                  >
                    <Image
                      src={RemoveIcon}
                      alt="delete button"
                      style={{ width: 22, height: 27.5 }}
                      className="insetcenter"
                    />
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
export default React.memo(Todo)
