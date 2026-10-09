'use client'

import { useEffect, useState } from 'react'

const DateDisplay = () => {
  const [date, setDate] = useState('')

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString('bn-BD', {
        dateStyle: 'full',
      }),
    )
  }, [])

  return <div>{date}</div>
}

export default DateDisplay
