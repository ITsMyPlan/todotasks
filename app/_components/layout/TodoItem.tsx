import React from 'react'
import { Task } from '@/_types/taskType'

import Image from 'next/image'
import ArrowBtn from '@/public/icons/arrow2.png'

interface TodoItemProps {
  task: Task
  viewTaskBtn: (task: Task) => void
  checked: boolean
  checkTask: (taskId: string, checked: boolean) => void
}

const TodoItem: React.FC<TodoItemProps> = ({ task, viewTaskBtn, checked, checkTask }) => {
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkTask(task.todo_id.toString(), e.target.checked)
  }

  return (
    <>
      <div className="border-b-4 px-[2px] py-[4px] w-full">
        <div className="flex items-center w-full">
          <input
            type="checkbox"
            name="task"
            onChange={handleCheck}
            checked={checked}
            className="absolute left-0 ml-[14px] appearance-none w-full h-full border-2 border-gray-200 rounded-sm bg-white checked:bg-rose-200 checked:border-0"
            style={{ width: 20, height: 20 }}
          />
          <button onClick={() => viewTaskBtn(task)} className="flex items-center justify-between w-full">
            <div className="px-[10px] py-[4px] w-full cursor-pointer focus:outline-none rounded-lg">
              <div className="flex items-center justify-between w-full pl-[20px] pr-[30px]">
                <div className="flex items-center min-w-0">
                  <div className="truncate ml-[15px] mx-[4px]">{task.todo_title}</div>
                  <Image
                    src={ArrowBtn}
                    alt="view more"
                    style={{ width: 15, height: 12 }}
                    className="absolute right-0 mr-[8px]"
                  />
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  )
}

export default React.memo(TodoItem, (prevProps, nextProps) => {
  return (
    prevProps.task.todo_id === nextProps.task.todo_id &&
    prevProps.task.todo_title === nextProps.task.todo_title &&
    prevProps.task.todo_detail === nextProps.task.todo_detail &&
    prevProps.checked === nextProps.checked
  )
})
