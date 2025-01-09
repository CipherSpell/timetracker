import React from 'react'

interface ReportCardsProps {
  time: number
  text: string
}

const ReportCards = ({ time, text }: ReportCardsProps) => {
  return (
    <div className='mt-12 p-4 block max-w-48 bg-white border rounded-lg dark:bg-gray-900 dark:border-gray-900'>
      <div className='mb-2 text-2xl font-bold dark:text-white'>{time}</div>
      <p className='font-bold dark:text-white'>{text}</p>
    </div>
  )
}

export default ReportCards
