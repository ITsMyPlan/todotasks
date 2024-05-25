import Sidebar from './_components/layout/Sidebar'
import Today from './_components/today/page'

export default function Home() {
  
  return (
    <div className="container flex min-w-80 max-w-80 h-lvh mx-[21px] my-[22px]">
      <Sidebar />
      <Today />
    </div>
  )
}
