'use client'

import React, { useState } from 'react'
import Timer from './Timer'
import Stopwatch from './Stopwatch'

const Timetracker = () => {
  const [activeComponent, setActiveComponent] = useState<string>('')

  const handleActiveComponent = (data: string) => {
    setActiveComponent(data)
  }

  return (
    <div>
      {activeComponent === 'Timer' ? (
        <Timer sendActiveComponent={handleActiveComponent} />
      ) : (
        <Stopwatch sendActiveComponent={handleActiveComponent} />
      )}
    </div>
  )
}

export default Timetracker
