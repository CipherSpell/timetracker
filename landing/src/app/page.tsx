import ReportCards from '../components/ReportCards'
import Timetracker from '../components/timetracker/Timetracker'

export default function Home() {
  return (
    <div className=''>
      <ReportCards time={1} text='hours focused' />
      <ReportCards time={5} text='day streak' />
      <Timetracker />
    </div>
  )
}
