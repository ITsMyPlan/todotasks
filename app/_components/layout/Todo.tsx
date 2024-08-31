'use client'
import React from 'react'
import { useCallback, useEffect, useState } from 'react'
import Modal from '@/common/modal/Modal'
import { useViewTaskModalState, useModalActions, useEditTaskModalState } from '@/store/useModalState'
import TaskForm from '@/common/modal/TaskForm'
import { useTaskStore } from '@/store/useTaskStore'
import { Task } from '@/_types/taskType'
import TodoItem from './TodoItem'
import useToggleSidebar from '@/store/useToggleSidebar'
import { useUserStore } from '@/store/useUserStore'

import Image from 'next/image'
import RemoveIcon from '@/public/icons/trashcan.png'
import EditIcon from '@/public/icons/editicon.png'
import AddIcon from '@/public/icons/blackadd.png'
import ThreeLine from '@/public/icons/line.png'

const Todo = () => {
  const checkisLogin = useUserStore(state => state.checkisLogin)

    useEffect(() => {
      checkisLogin()
    }, [checkisLogin])
    
  const viewTask = useViewTaskModalState()
  const editTask = useEditTaskModalState()

  const deleteTask = useTaskStore(state => state.deleteTask)
  const { changeModalState } = useModalActions()

  const toggleSidebar = useToggleSidebar(state => state.toggleSidebar)

  const tasks = useTaskStore(state => state.tasks)
  const fetchTaskToday = useTaskStore(state => state.fetchTaskToday)

  useEffect(() => {
    fetchTaskToday()
  }, [fetchTaskToday])

  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [checkedTask, setCheckedTask] = useState<{ [key: string]: boolean }>({})
  const [selectedDate, setSelectedDate] = useState(new Date())

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

  const checkingBox = (taskId: string, checked: boolean) => {
    setCheckedTask(prev => ({
      ...prev,
      [taskId]: checked,
    }))
  }

  const checkboxDeleteBtn = async () => {
    const taskIdChecktoDelete = Object.keys(checkedTask).filter(taskId => checkedTask[taskId])
    await Promise.all(taskIdChecktoDelete.map(taskId => deleteTask(Number(taskId))))
    setCheckedTask({})
  }

  return (
    <div className="relative z-0 w-screen container h-full">
      <div className="text-[30px] font-bold border-b-4 py-[12px] flex items-center justify-between px-[5px]">
        <div className="flex justify-between">
          <button onClick={toggleSidebar}>
            <Image src={ThreeLine} alt="line" style={{ width: 20, height: 16 }} />
          </button>
          <div className="pl-[15px]">Today's Tasks</div>
        </div>
        <button onClick={checkboxDeleteBtn}>
          <Image
            src={RemoveIcon}
            alt="delete button"
            style={{ width: 22, height: 27.5 }}
            className="hover:bg-gray-200 active:bg-gray-300"
          />
        </button>
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
          <div className="w-[320px] max-sm:w-full bg-transparent resize-none h-80">
            {editTask ? (
              <TaskForm
                initialTitle={selectedTask.todo_title}
                initialDetail={selectedTask.todo_detail}
                taskId={selectedTask.todo_id}
                dueDate={selectedDate}
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
          <TaskForm dueDate={selectedDate} />
        )}
      </Modal>
    </div>
  )
}

export default React.memo(Todo)