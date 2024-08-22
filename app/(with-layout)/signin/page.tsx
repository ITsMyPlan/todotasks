'use client'
import Sidebar from '@/_components/layout/Sidebar'
import Signin from '@/_components/layout/Signin'
import useToggleSidebar from '@/store/useToggleSidebar'

export default function Home() {
  const isSidebarVisible = useToggleSidebar(state => state.isSidebarVisible)
  // const toggleSidebar = useToggleSidebar(state => state.toggleSidebar)

  return (
    <div className="container flex h-full w-full z-0">
      {isSidebarVisible && <Sidebar />}
      <Signin />
    </div>
  )
}
