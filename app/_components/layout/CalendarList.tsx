'use client'
import React, { useState } from 'react'
import WeekNames from './Weekname'
import takeMonth from '@/_utils/calendar/getCalendarDate'
import { addMonths, format, subMonths } from 'date-fns'
import Image from 'next/image'
import ThreeLine from '@/public/icons/line.png'
import useToggleSidebar from '@/store/useToggleSidebar'

const CalendarList = () => {
  const toggleSidebar = useToggleSidebar(state => state.toggleSidebar)

  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  
  const data = takeMonth(currentDate)()

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }
  return (
    <>
      <div className="box-border w-full h-full">
        <div className="flex flex-col ">
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
          <div className="">
            <WeekNames />
            {data.map((week, index) => (
              <div key={index} className="flex justify-around gap-[6px] mb-[4px] w-full">
                {week.map(day => (
                  <div onClick={() => setSelectedDate(day)} key={format(day, 'yyyy-MM-dd')} className="w-full">
                    <div className="min-w-[60px] sm:w-[80px] md:w-full w-full min-h-[90px] px-[4px] py-[2px] bg-fuchsia-200">
                      {format(day, 'd')}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default CalendarList
