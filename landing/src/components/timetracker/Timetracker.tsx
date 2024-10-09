'use client'

import React, { useState } from 'react'
import Timer from './Timer'
import Stopwatch from './Stopwatch'

const Timetracker = () => {
  const [activeComponent, setActiveComponent] = useState<'Timer' | 'Stopwatch'>(
    'Timer'
  )

  const showComponent = (component: 'Timer' | 'Stopwatch') => {
    setActiveComponent(component)
  }

  return (
    <div>
      {activeComponent === 'Timer' ? (
        <div>
          <Timer />
          <button onClick={() => showComponent('Stopwatch')}>Stopwatch</button>
        </div>
      ) : (
        <div>
          <Stopwatch />
          <button onClick={() => showComponent('Timer')}>Timer</button>
        </div>
      )}
    </div>
  )
}

export default Timetracker
