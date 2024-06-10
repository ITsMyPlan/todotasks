import Sidebar from '@/_components/layout/Sidebar'
import Todo from '@/_components/layout/Todo'

export default function Today() {
  return (
    <div className="container min-w-96 z-0 flex h-screen px-[21px] py-[22px]">
      <Sidebar />
      <Todo />
    </div>
  )
}
