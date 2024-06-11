import Sidebar from '@/_components/layout/Sidebar'
import Signin from '@/_components/layout/Signin'

export default function Home() {
  return (
    <div className="container flex min-w-80 h-screen w-full z-0 px-[21px] py-[22px]">
      <Sidebar />
      <Signin />
    </div>
  )
}
