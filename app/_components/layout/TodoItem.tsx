import React from 'react'
import { Task } from '@/_types/taskType'

import Image from 'next/image'
import ArrowBtn from '@/public/icons/arrow2.png'

interface TodoItemProps {
  task: Task
  viewTaskBtn: (task: Task) => void
}

const TodoItem: React.FC<TodoItemProps> = ({ task, viewTaskBtn }) => {
  return (
    <>
      <div className="border-b-4 border-lightGray/30 px-[4px] py-[4px] w-full">
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
    </>
  )
}

export default React.memo(TodoItem, (prevProps, nextProps) => {
  return (
    prevProps.task.todo_id === nextProps.task.todo_id &&
    prevProps.task.todo_title === nextProps.task.todo_title &&
    prevProps.task.todo_detail === nextProps.task.todo_detail
  )
})
