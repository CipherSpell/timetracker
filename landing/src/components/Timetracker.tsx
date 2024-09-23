'use client'

import { useEffect, useState } from 'react'

interface TimerProps {
  minutes?: number
}

const Timetracker: React.FC<TimerProps> = () => {
  const [started, setStarted] = useState<boolean>(false)
  const [time, setTime] = useState<number>(30 * 60)

  const handleClick = () => {
    setStarted(!started)
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined

    if (started && time > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
      }, 1000)
    }

    return () => {
      if (intervalId) clearInterval(intervalId) // Clean up interval on pause/unmount
    }
  }, [started, time])

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`
  }

  return (
    <div className='flex flex-col min-h-screen justify-center items-center'>
      <div className='text-9xl mb-8'>{formatTime(time)}</div>
      <div className='w-20'>
        <button
          className={
            started
              ? 'bg-red-300 rounded-md w-full text-sm py-1'
              : 'bg-blue-300 rounded-md w-full text-sm py-1'
          }
          onClick={() => handleClick()}
        >
          {started ? 'Pause' : 'Start'}
        </button>
      </div>
    </div>
  )
}

export default Timetracker
