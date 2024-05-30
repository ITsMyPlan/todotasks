import Sidebar from '@/_components/layout/Sidebar'
import Todo from '@/_components/layout/Todo'

export default function Today() {
  return (
    <div className="container flex min-w-80 max-w-80 h-lvh mx-[21px] my-[22px]">
      <Sidebar />
      <Todo />
    </div>
  )
}
