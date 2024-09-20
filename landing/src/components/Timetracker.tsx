'use client'

import { useState } from 'react'

// interface TimerProps {
//   minutes?: number
// }

const Timetracker: React.FC = () => {
  const [started, setStarted] = useState<boolean>(false)
  //   const [time, setTime] = useState<string>('00:00')

  const handleClick = () => {
    setStarted(!started)
  }

  return (
    <div className='flex flex-col min-h-screen justify-center items-center'>
      {/* <div className='text-9xl mb-8'>{time}</div> */}
      <div className='text-9xl mb-8'>00:00</div>
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
