import { FormEvent, useState, useEffect, useRef } from 'react'
import { useTaskStore } from '@/store/useTaskStore'
import { useModalActions } from '@/store/useModalState'
import { useUserStore } from '@/store/useUserStore'
import { TaskFormProps } from '@/_types/taskType'

import Image from 'next/image'
import AddIconWhite from '@/public/icons/whiteadd.png'

const TaskForm = ({ initialTitle = '', initialDetail = '', taskId = null, dueDate = new Date() }: TaskFormProps) => {
  const { changeModalState } = useModalActions()

  const createTask = useTaskStore(state => state.createTask)
  const editTask = useTaskStore(state => state.editTask)

  const [title, setTitle] = useState(initialTitle)
  const [detail, setDetail] = useState(initialDetail)
  const user = useUserStore(state => state.user)

  useEffect(() => {
    setTitle(initialTitle)
    setDetail(initialDetail)
  }, [initialTitle, initialDetail])

  const handleUpdateTask = async (e: FormEvent) => {
    e.preventDefault()
    if (!title || title.length === 0) {
      alert('오늘의 할일 타이틀을 작성해주세요.')
      return
    }
    if (taskId) {
      await editTask(taskId, title, detail)
      changeModalState('edit', false)
      changeModalState('view', false)
    } else {
      await createTask(title, detail, user.id, dueDate)
      changeModalState('add', false)
      changeModalState('view', false)
    }
    setTitle('')
    setDetail('')
  }

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const textareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetail(e.target.value)
    resizeTextarea()
  }
  const resizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto' 
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }
  useEffect(() => {
    resizeTextarea()
  }, [])

  return (
    <form onSubmit={handleUpdateTask} className="box-border">
      <div className=" w-full h-full">
        <div className="box-border border-b-4 py-[8px]">
          <input
            type="text"
            placeholder="Task"
            value={title}
            minLength={1}
            maxLength={50}
            onChange={e => setTitle(e.target.value)}
            className="overflow-auto w-full h-[30px] bg-transparent focus:outline-none"
          />
        </div>
        <div className="border-b-4 w-full h-full py-[10px]">
          <textarea
            ref={textareaRef}
            placeholder="Description"
            value={detail}
            minLength={0}
            maxLength={150}
            onChange={textareaChange}
            className="resize-none border focus:outline-none outline-none w-full h-auto wraptextarea bg-transparent overflow-y-hidden"
            style={{ height: 'auto' }}
          />
        </div>
      </div>

      <button
        type="submit"
        className="absolute bottom-0 h-[60px] rounded-md bg-gray-200 hover:bg-gray-300 active:bg-gray-300 w-full "
      >
        <Image src={AddIconWhite} alt="addIcon" style={{ width: 20, height: 20 }} className="insetcenter" />
      </button>
    </form>
  )
}

export default TaskForm
