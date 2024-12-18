import Modal from '@/src/components/ui/Modal'

const ModalLoading = () => {
  return (
    <Modal>
      <div className='w-full animate-pulse'>
        <div className='w-full h-4 bg-gray-200 rounded my-5'></div>
        <div className='w-full min-h-32 bg-gray-200 rounded'></div>
      </div>
    </Modal>
  )
}

export default ModalLoading
