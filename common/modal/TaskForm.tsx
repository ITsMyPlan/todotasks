import { FormEvent, useState, useEffect } from 'react'
import { useTaskStore } from '@/store/useTaskStore'
import { useModalActions } from '@/store/useModalState'
import { useUserStore } from '@/store/useUserStore'
import { TaskFormProps } from '@/_types/taskType'

import Image from 'next/image'
import AddIconWhite from '@/public/icons/whiteadd.png'


const TaskForm = ({ initialTitle = '', initialDetail = '', taskId = null }: TaskFormProps) => {
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
      alert('please write a Task name')
      return
    }

    if (taskId) {
      await editTask(taskId, title, detail)
      changeModalState('edit')
      changeModalState('view')
    } else {
      await createTask(title, detail, user.id)
      changeModalState('add')
      changeModalState('view')
    }
    setTitle('')
    setDetail('')
  }

  return (
    <form onSubmit={handleUpdateTask}>
      <div className="h-full ">
        <div className="border-b-4 py-[8px]">
          <input
            type="text"
            placeholder="Task"
            value={title}
            minLength={1}
            maxLength={50}
            onChange={e => setTitle(e.target.value)}
            className="w-full h-[30px] bg-transparent focus:outline-none"
          />
        </div>
        <div className="border-b-4 h-full py-[10px]">
          <textarea
            placeholder="Description"
            value={detail}
            minLength={0}
            maxLength={150}
            onChange={e => setDetail(e.target.value)}
            className="resize-none border focus:outline-none outline-none w-full h-full bg-transparent overflow-hidden"
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
