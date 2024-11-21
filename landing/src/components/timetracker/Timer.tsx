'use client'

import { useEffect, useState } from 'react'
import { Button } from '../ui/Button'

// TODO: Pass sendActiveComponent as props when we figure out component swapping without the warning in the browser

// interface TimerProps {
//   sendActiveComponent: (data: string) => void
// }

const Timer: React.FC = () => {
  const [started, setStarted] = useState<boolean>(false)
  const [time, setTime] = useState<number>(30 * 60)
  // const [currentComponent] = useState<string>('Stopwatch')

  const handleStart = () => {
    setStarted(!started)
  }

  // const sendData = () => {
  //   sendActiveComponent(currentComponent)
  // }

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
        <Button
          variant={!started ? 'primary' : ''}
          onClick={() => handleStart()}
        >
          {started ? 'Pause' : 'Start'}
        </Button>
        {/* <Button variant='primary' onClick={sendData}>
          Stopwatch
        </Button> */}
      </div>
    </div>
  )
}

export default Timer
