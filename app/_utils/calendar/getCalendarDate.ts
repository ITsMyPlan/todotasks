import { startOfWeek, startOfMonth, endOfMonth, startOfDay, addDays } from 'date-fns'

function takeWeek(selectedDate: Date = new Date()): () => Date[] {
  let date: Date = startOfWeek(startOfDay(selectedDate))
  return function (): Date[] {
    const week: Date[] = [...Array(7)].map((_, idx) => addDays(date, idx))
    date = addDays(week[6], 1)
    return week
  }
}

function lastDay(range: Date[][]): Date | null {
  if (range.length === 0) {
    return null
  }
  const lastWeek = range[range.length - 1]
  if (lastWeek.length < 7) {
    return null
  }
  return lastWeek[6]
}

export default function takeMonth(startDate: Date = new Date()): () => Date[][] {
  let month: Date[][] = []
  let date: Date = startDate
  return function (): Date[][] {
    const weekGen = takeWeek(startOfMonth(date))
    const endDate: Date = startOfDay(endOfMonth(date))

    while (lastDay(month)! < endDate) {
      month.push(weekGen())
    }

    const range: Date[][] = month
    month = []
    date = addDays(lastDay(range)!, 1)

    return range
  }
}

