'use client'
import React from 'react'
import { useCallback, useEffect, useState } from 'react'
import Modal from '@/common/modal/Modal'
import { useViewTaskModalState, useModalActions, useEditTaskModalState } from '@/store/useModalState'
import TaskForm from '@/common/modal/TaskForm'
import { useTaskStore } from '@/store/useTaskStore'
import { Task } from '@/_types/taskType'
import TodoItem from './TodoItem'

import Image from 'next/image'
import RemoveIcon from '@/public/icons/trashcan.png'
import EditIcon from '@/public/icons/editicon.png'
import AddIcon from '@/public/icons/blackadd.png'

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
      }
    },
    [viewTask, changeModalState],
  )

  useEffect(() => {
    if (viewTask || editTask) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [viewTask, editTask])

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
    <div className=" relative z-0 w-full container h-full ">
      <div className="text-[30px] font-bold border-b-4 py-[12px]">
        <div className="flex items-center justify-between px-[5px]">
          Today
          <button onClick={checkboxDeleteBtn}>
            <Image
              src={RemoveIcon}
              alt="delete button"
              style={{ width: 22, height: 27.5 }}
              className="  hover:bg-gray-200 active:bg-gray-300 "
            />
          </button>
        </div>
      </div>

      <div className="border-b-4 px-[4px] py-[4px]">
        <button
          onClick={addTaskBtn}
          className="items-center cursor-pointer bg-gray-100 hover:bg-gray-200 active:bg-gray-200 focus:outline-none rounded-lg px-[10px] py-[4px] w-full flex"
        >
          <Image src={AddIcon} alt="add button" style={{ width: 20, height: 20 }} className="mr-[8px]" />
          Add new tasks
        </button>
      </div>

      <div className="relative">
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

      <Modal>
        {viewTask && selectedTask ? (
          <div className="max-sm:w-full min-w-full bg-transparent resize-none h-80 ">
            {editTask ? (
              <TaskForm
                initialTitle={selectedTask.todo_title}
                initialDetail={selectedTask.todo_detail}
                taskId={selectedTask.todo_id}
              />
            ) : (
              <div className="w-full h-full">
                <div className="border-b-4">
                  <div className="w-full h-full py-[8px] break-all">{selectedTask.todo_title}</div>
                </div>
                <div className="border-b-4 h-full">
                  <div className="w-full h-full pt-[8px] py-[8px] break-all">{selectedTask.todo_detail}</div>
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
