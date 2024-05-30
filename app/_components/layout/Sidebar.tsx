'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useUserStore } from '@/store/useUserStore'
import { useEffect } from 'react'
import logout from '@/_components/auth/signOut/actions'
import UnknownUser from '@/public/icons/unknown.png'


const Sidebar = () => {

 const user = useUserStore(state => state.user)
 const fetchUser = useUserStore(state => state.fetchUser)

 useEffect(() => {
   fetchUser()
 }, [fetchUser])

 const email = user ? user.email : null

  return (
    <div className="box-border bg-gray-100 xl rounded-2xl w-80">
      <div>
        <div>
          <Image src={UnknownUser} alt="userimg" width={30} height={30} />
          {user ? `${email}` : <Link href="/login">Login</Link>}
        </div>
      </div>
      <div>
        List
        <div>
          <Link href="/today">Today</Link>
        </div>
        <div>
          <Link href="/calendar">Calendar</Link>
        </div>
      </div>
      <div>
        Tags
        <div>Add new tags</div>
      </div>
      <div> 
        {user ? <button onClick={logout}>sign out</button> : ""}
        </div>
    </div>
  )
}
export default Sidebar