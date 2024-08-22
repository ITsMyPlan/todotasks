'use client'
import React, { useState } from 'react'
import WeekNames from './Weekname'
import takeMonth from '@/_utils/calendar/getCalendarDate'
import { addMonths, format, subMonths } from 'date-fns'

const CalendarList = () => {
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
        <div className="flex justify-around items-center">
          <button onClick={prevMonth}>prev</button>
          <h1 className="">{format(currentDate, 'MMMM yyyy')}</h1>
          <button onClick={nextMonth}>next</button>
        </div>
        <div className="">
          <WeekNames />
          {data.map((week, index) => (
            <div key={index} className="flex justify-between w-full">
              {week.map(day => (
                <div onClick={() => setSelectedDate(day)} key={format(day, 'yyyy-MM-dd')}>
                  <div className='max-sm:min-w-[60px] sm:min-w-[70px] md:w-[100px] w-full min-h-[90px] px-[4px] py-[2px] mb-[4px] bg-fuchsia-200'>{format(day, 'd')}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
export default CalendarList
