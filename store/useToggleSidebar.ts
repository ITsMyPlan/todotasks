import { create } from 'zustand'

interface SidebarState {
  isSidebarVisible: boolean
  toggleSidebar: () => void
}
const useToggleSidebar = create<SidebarState>(set => ({
  isSidebarVisible: false,
  toggleSidebar: () => set(state => ({ isSidebarVisible: !state.isSidebarVisible })),
}))

export default useToggleSidebar
