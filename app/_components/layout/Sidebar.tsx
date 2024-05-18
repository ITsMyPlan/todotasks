import Link from 'next/link'

export default function Sidebar() {
  return (
    <div className="box-border bg-gray-100 xl rounded-2xl w-80 ">
      여기에 320x980 네모 sidebar
      <div>
        <Link href="/login">Login</Link>
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
    </div>
  )
}
