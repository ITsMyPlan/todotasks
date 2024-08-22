'use client'
import Sidebar from '@/_components/layout/Sidebar'
import Todo from '@/_components/layout/Todo'
import useToggleSidebar from '@/store/useToggleSidebar'

export default function Today() {
  const isSidebarVisible = useToggleSidebar(state => state.isSidebarVisible)

  return (
    <div className="container flex h-full w-full z-0">
      {isSidebarVisible && <Sidebar />}
      <Todo />
    </div>
  )
}
