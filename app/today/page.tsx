import Sidebar from '@/_components/layout/Sidebar'
import Todo from '@/_components/layout/Todo'

export default function Today() {
  return (
    <div className="container w-100% z-0 flex h-screen px-[21px] py-[22px] bg-red-100">
      <Sidebar />
      <Todo />
    </div>
  )
}
