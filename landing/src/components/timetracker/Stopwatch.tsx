'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from '../ui/Button'
import { pauseTimer, startTimer } from './TimerActions'

const Stopwatch = () => {
  const [started, setStarted] = useState<boolean>(false)
  const [time, setTime] = useState<number>(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const handleStart = () => {
    if (started) {
      pauseTimer()
      setStarted(false)
    } else {
      startTimer()
      setStarted(true)
    }
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
        <Button
          variant={!started ? 'primary' : ''}
          onClick={() => handleStart()}
        >
          {started ? 'Pause' : 'Start'}
        </Button>
      </div>
    </div>
  )
}

export default Stopwatch
