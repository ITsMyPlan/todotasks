export default function WeekNames() {
  const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat']
  return (
    <div className="flex justify-around items-center px-[2px] my-[8px]">
      {weeks.map(dayName => (
        <div className="w-full h-[26px] bg-lime-400 flex justify-center items-center" key={dayName}>
          {dayName}
        </div>
      ))}
    </div>
  )
}
