import { useState } from 'react'
import useTaskStore from '@/store/useTaskStore'
import { useAddTaskModalState, useViewTaskModalState, useModalActions } from '@/store/useModalStore'
import { ModalProps } from '@/_types/modalType'

const Modal = ({ children }: ModalProps) => {
  const addTaskOn = useAddTaskModalState()
  const viewTaskOn = useViewTaskModalState()
  const { changeModalState } = useModalActions()

  const addTask = useTaskStore(state => state.addTask)

  const [title, setTitle] = useState("")
  const [detail, setDetail] = useState("")

  const handleAddTask = () => {
    addTask(title, detail)
    setTitle("")
    setDetail("")
    changeModalState("add")
  }

  if (!addTaskOn && !viewTaskOn) return null

  return (
    <div className=''>
      <div>
        <button type="button" onClick={() => changeModalState(addTaskOn ? 'add' : 'view')}>
          X
        </button>
        {addTaskOn && (
          <div>
            <input type="text" placeholder="Task" value={title} onChange={e => setTitle(e.target.value)} />
            <textarea placeholder="Description" value={detail} onChange={e => setDetail(e.target.value)} />
            <button type="button" onClick={handleAddTask}>
              ADD
            </button>
          </div>
        )}
        {viewTaskOn && <div>{children}</div>}
      </div>
    </div>
  )
}

export default Modal
