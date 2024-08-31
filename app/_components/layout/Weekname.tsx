export default function WeekNames() {
  const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat']
  return (
    <div className="flex justify-around items-center px-[2px] my-[8px] border-2 border-neutral-100">
      {weeks.map(dayName => (
        <div className="w-full h-[26px] flex justify-center items-center text-neutral-800" key={dayName}>
          {dayName}
        </div>
      ))}
    </div>
  )
}
