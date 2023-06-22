'use client'

import { parseISO, format } from 'date-fns'
import { useEffect, useState } from 'react'

// dateString might be null for unpublished posts
export default function DateComponent({ dateString } : {dateString: string}) {
  const [date, setDate] = useState(dateString ? parseISO(dateString) : null)
  useEffect(() => {
    if (!date) {
      setDate(new Date())
    }
  }, [date])
  return date && <time dateTime={date.toString()}>{format(date, 'LLLL d, yyyy')}</time>
}
