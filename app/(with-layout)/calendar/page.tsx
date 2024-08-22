'use client'
import CalendarList from '@/_components/layout/CalendarList'
import Sidebar from '@/_components/layout/Sidebar'
import useToggleSidebar from '@/store/useToggleSidebar'

export default function Calendar() {
  const isSidebarVisible = useToggleSidebar(state => state.isSidebarVisible)

  return (
    <div className="flex w-full z-0 h-full">
      {isSidebarVisible && <Sidebar />}
        <CalendarList />
    </div>
  )
}
