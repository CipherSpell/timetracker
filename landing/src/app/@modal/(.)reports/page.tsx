import FocusDetails from '@/src/components/report/FocusDetails'
import Modal from '@/src/components/ui/Modal'
import React, { Suspense } from 'react'
import ModalLoading from './loading'

const ReportsModal = async () => {
  return (
    <Suspense fallback={<ModalLoading />}>
      <Modal>
        <FocusDetails />
      </Modal>
    </Suspense>
  )
}

export default ReportsModal
