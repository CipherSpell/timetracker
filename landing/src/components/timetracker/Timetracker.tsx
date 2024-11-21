'use client'

import React from 'react'
import Timer from './Timer'
// import Stopwatch from './Stopwatch'

const Timetracker = () => {
  // const [activeComponent, setActiveComponent] = useState<string>('')

  // const handleActiveComponent = (data: string) => {
  //   setActiveComponent(data)
  // }

  return (
    // TODO: Uncomment when we figure out component swapping without the warning
    // <div>
    //   {activeComponent === 'Timer' ? (
    //     <Timer sendActiveComponent={handleActiveComponent} />
    //   ) : (
    //     <Stopwatch sendActiveComponent={handleActiveComponent} />
    //   )}
    // </div>
    <div>
      <Timer />
    </div>
  )
}

export default Timetracker
