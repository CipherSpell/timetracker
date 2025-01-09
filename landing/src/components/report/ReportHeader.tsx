interface ReportHeaderProps {
  title: string
}

const ReportHeader = ({ title }: ReportHeaderProps) => {
  return (
    <div className='flex items-center w-full my-5'>
      <h1 className='text-nowrap mr-2 font-bold text-lg w-fit'>{title}</h1>
      <hr className='divide-solid w-full' />
    </div>
  )
}

export default ReportHeader
