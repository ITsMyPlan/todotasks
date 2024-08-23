'use client'
import React, { useState } from 'react'
import takeMonth from '@/_utils/calendar/getCalendarDate'
import { format } from 'date-fns'
const CalendarItem = ({ currentDate }: { currentDate: Date }) => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const data = takeMonth(currentDate)() 
// 전달받은 currentDate를 사용하여 월 데이터를 가져옴
// 일자 선택하면 해당 일자에 저장된 투두태스크 보여줌, + CRUD가능
// 캘린더에는 일자의 태스크 갯수만큼 컬러dot으로 표현

  return (
    <>
      {data.map((week, index) => (
        <div key={index} className="flex justify-around gap-[6px] mb-[4px] w-full">
          {week.map(day => (
            <div onClick={() => setSelectedDate(day)} key={format(day, 'yyyy-MM-dd')} className="w-full">
              <div className="min-w-[60px] sm:w-[80px] md:w-full w-full min-h-[90px] px-[4px] py-[2px] bg-fuchsia-200">
                <button>{format(day, 'd')}</button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

export default CalendarItem