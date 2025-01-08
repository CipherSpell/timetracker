import React from 'react'
import ReportHeader from './ReportHeader'
import text from '@/src/utils/text.json'

//TODO: remove dummy data below after fetching data from backend. Fetch data via server action
const focusData = [
  {
    date: '16-Dec-2024',
    time: '01:28 ~ 01:49',
    category: 'Code',
    duration: '02:12',
  },
  {
    date: '17-Dec-2024',
    time: '11:28 ~ 15:22',
    category: 'Study',
    duration: '04:12',
  },
  {
    date: '13-Mar-2024',
    time: '21:01 ~ 23:59',
    category: 'Chores',
    duration: '02:58',
  },
]

const FocusDetails: React.FC = () => {
  const { date, category, duration } = text.FocusDetails

  return (
    <div>
      <ReportHeader title='Focus Time Details' />
      <table className='table-fixed text-sm w-full'>
        <thead>
          <tr className='border-b'>
            <th>{date}</th>
            <th>{category}</th>
            <th>{duration}</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {focusData.map((data, index) => {
            return (
              <tr className='border-b' key={index}>
                <td>
                  <span className='text-gray-400 font-bold'>{data.date}</span>
                  <br />
                  {data.time}
                </td>
                <td>{data.category}</td>
                <td>{data.duration}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default FocusDetails
