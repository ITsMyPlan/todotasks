'use client'

import Link from 'next/link'
import Image from 'next/image'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { createClient } from '_utils/supabase/client'

import { useEffect, useState } from 'react'
import logout from '_components/auth/signOut/actions'
import UnknownUser from '../../../public/icons/unknown.png'

interface User extends SupabaseUser {}

export default function Sidebar() {
  const [userData, setUserData] = useState<User | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const { data: { user }, error } = await supabase.auth.getUser()
      setUserData(user)
    }
    fetchData()
  }, [])

  const email = userData ? userData.email : null

  return (
    <div className="box-border bg-gray-100 xl rounded-2xl w-80">
      <div>
        <div>
          <Image src={UnknownUser} alt="userimg" width={30} height={30} />
          {userData ? `${email}` : <Link href="/login">Login</Link>}
        </div>
      </div>
      <div>
        List
        <div>
          <Link href="/">Today</Link>
        </div>
        <div>
          <Link href="/calendar">Calendar</Link>
        </div>
      </div>
      <div>
        Tags
        <div>Add new tags</div>
      </div>
      <button onClick={logout}>sign out</button>
    </div>
  )
}
