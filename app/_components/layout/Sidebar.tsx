'use client'
import Link from 'next/link'
import { useUserStore } from '@/store/useUserStore'
import { useEffect } from 'react'
import logout from '@/_components/auth/signOut/actions'
import useToggleSidebar from '@/store/useToggleSidebar'

import Image from 'next/image'
import UnknownUser from '@/public/icons/unknown.png'
import TodayIcon from '@/public/icons/todayicon.png'
import CalendarIcon from '@/public/icons/calendaricon.png'
import AddIcon from '@/public/icons/blackadd.png'
import SignoutIcon from '@/public/icons/signoutIcon.png'
import ArrowBtn from '@/public/icons/arrow1.png'

const Sidebar = () => {
  const user = useUserStore(state => state.user)
  const checkisLogin = useUserStore(state => state.checkisLogin)

  const toggleSidebar = useToggleSidebar(state => state.toggleSidebar)

  useEffect(() => {
    checkisLogin()
  }, [checkisLogin])

  const email = user ? user.email : null

  return (
    // max-md:hidden ? <= 8/23 현재 버튼 클릭으로 상태 공유하게 둿는데, 반응형으로 크기 조절 되었을 때도 상태에 영향이 공유되도록 하는 방법이 있을까?
    <div className="max-md:hidden mr-[10px] z-900 relative box-border bg-gray-100 font-bold text-neutral-500 rounded-2xl min-w-80 px-[27px] py-[22px]">
      <div className="border-b-4  mb-[14px] pb-[18px]">
        <button type="button" className="flex items-center" onClick={toggleSidebar}>
          <div className="max-w-max mr-[18px]">
            <Image src={UnknownUser} alt="userimg" style={{ width: 30, height: 30 }} />
          </div>
          <div className="text-stone-900">{user ? `${email}` : <Link href="/signin">Login</Link>}</div>
        </button>
      </div>

      <div className="border-b-4">
        <div className="">List</div>
        <div className="my-[14px] text-stone-900">
          <Link href="/">
            <button type="button" className="flex items-center mb-[14px] relative w-full">
              <div className="max-w-max mr-[18px]">
                <Image src={TodayIcon} alt="userimg" style={{ width: 20, height: 11.4 }} />
              </div>

              <div>Today</div>

              <div className="absolute right-0">
                <Image src={ArrowBtn} alt="view more" style={{ width: 7, height: 14 }} />
              </div>
            </button>
          </Link>

          <Link href="/calendar">
            <button type="button" className="flex items-center relative w-full">
              <div className="max-w-max mr-[18px]">
                <Image src={CalendarIcon} alt="userimg" style={{ width: 20, height: 20 }} />
              </div>
              <div>Calendar</div>
              <div className="absolute right-0">
                <Image src={ArrowBtn} alt="view more" style={{ width: 7, height: 14 }} />
              </div>
            </button>
          </Link>
        </div>
      </div>

      <div className="my-[14px]">
        <div className="mb-[14px]">Tags</div>
        <button type="button" className="flex items-center mb-[14px]">
          <div className="max-w-max mr-[18px]">
            <Image src={AddIcon} alt="userimg" style={{ width: 20, height: 20 }} />
          </div>
          <div>Add new tags</div>
        </button>
      </div>

      <div className="w-full absolute bottom-0 pr-[58px] max-h-[600px] pb-[22px]">
        <div className="border-t-4 pt-[22px]">
          {user ? (
            <button type="button" onClick={logout} className="flex items-center">
              <div className="max-w-max mr-[18px]">
                <Image src={SignoutIcon} alt="userimg" style={{ width: 20, height: 20 }} />
              </div>
              <div>Logout</div>
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}
export default Sidebar
