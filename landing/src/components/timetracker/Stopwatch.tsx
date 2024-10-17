'use client'

import React, { useState, useEffect, useRef } from 'react'

interface StopwatchProps {
  sendActiveComponent: (data: string) => void
}

const Stopwatch: React.FC<StopwatchProps> = ({ sendActiveComponent }) => {
  const [started, setStarted] = useState<boolean>(false)
  const [time, setTime] = useState<number>(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [currentComponent] = useState<string>('Timer')

  const handleStart = () => {
    setStarted(!started)
  }

  const sendData = () => {
    sendActiveComponent(currentComponent)
  }

  useEffect(() => {
    if (started) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [started])

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
          onClick={() => handleStart()}
        >
          {started ? 'Pause' : 'Start'}
        </button>
        <button
          className='bg-blue-300 rounded-md w-full text-sm py-1'
          onClick={sendData}
        >
          Timer
        </button>
      </div>
    </div>
  )
}

export default Stopwatch
