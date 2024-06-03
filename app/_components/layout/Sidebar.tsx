'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useUserStore } from '@/store/useUserStore'
import { useEffect } from 'react'
import logout from '@/_components/auth/signOut/actions'
import UnknownUser from '@/public/icons/unknown.png'
import TodayIcon from '@/public/icons/todayicon.png'
import CalendarIcon from '@/public/icons/calendaricon.png'
import AddIcon from '@/public/icons/add.png'
import SignoutIcon from '@/public/icons/SignoutIcon.png'
import ArrowBtn from '@/public/icons/arrow1.png'

const Sidebar = () => {
  const user = useUserStore(state => state.user)
  const fetchUser = useUserStore(state => state.fetchUser)

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const email = user ? user.email : null

  return (
    <div className="hidden sm:block relative box-border bg-gray-100 font-bold text-neutral-500 rounded-2xl w-[300px] min-w-[300px] px-[27px] py-[22px]">
      <div className="border-b-4 border-lightGray/70 mb-[14px] pb-[18px]">
        <button type="button" className="flex items-center">
          <div className="max-w-max mr-[18px]">
            <Image src={UnknownUser} alt="userimg" style={{ width: 30, height: 30 }} />
          </div>
          <div className="text-stone-900">{user ? `${email}` : <Link href="/signin">Login</Link>}</div>
        </button>
      </div>

      <div className="border-b-4 border-lightGray/70">
        <div className="">List</div>
        <div className="my-[14px] text-stone-900">
          <button type="button" className="flex items-center mb-[14px] relative w-full">
            <div className="max-w-max mr-[18px]">
              <Image src={TodayIcon} alt="userimg" style={{ width: 20, height: 11.4 }} />
            </div>
            <div>
              <Link href="/today">Today</Link>
            </div>
            <div className="absolute right-0">
              <Image src={ArrowBtn} alt="view more" style={{ width: 7, height: 14 }} />
            </div>
          </button>

          <button type="button" className="flex items-center relative w-full">
            <div className="max-w-max mr-[18px]">
              <Image src={CalendarIcon} alt="userimg" style={{ width: 20, height: 20 }} />
            </div>
            <div>
              <Link href="/calendar">Calendar</Link>
            </div>
            <div className="absolute right-0">
              <Image src={ArrowBtn} alt="view more" style={{ width: 7, height: 14 }} />
            </div>
          </button>
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

      <div className="absolute w-[246px] max-h-[600px] bottom-0 py-[32px]">
        <div className="border-t-4 border-lightGray/70 pt-[32px]">
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
