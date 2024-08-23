'use client'
import React, { useState } from 'react'
import WeekNames from './Weekname'
import { addMonths, format, subMonths } from 'date-fns'
import Image from 'next/image'
import ThreeLine from '@/public/icons/line.png'
import useToggleSidebar from '@/store/useToggleSidebar'
import CalendarItem from './CalendarItem'

const CalendarList = () => {
  const toggleSidebar = useToggleSidebar(state => state.toggleSidebar)
  const [currentDate, setCurrentDate] = useState(new Date())

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  return (
    <>
      <div className="box-border w-full h-full">
        <div className="flex flex-col">
          <div className="text-[30px] flex items-center font-bold border-b-4 py-[12px] px-[5px]">
            <button onClick={toggleSidebar}>
              <Image src={ThreeLine} alt="line" style={{ width: 20, height: 16 }} />
            </button>
            <div className="pl-[15px]">Calendar</div>
          </div>

          <div className="flex justify-around items-center">
            <button onClick={prevMonth}>prev</button>
            <h1 className="">{format(currentDate, 'MMMM yyyy')}</h1>
            <button onClick={nextMonth}>next</button>
          </div>

          <div>
            <WeekNames />
            <CalendarItem currentDate={currentDate} />
          </div>
        </div>
      </div>
    </>
  )
}

export default CalendarList
