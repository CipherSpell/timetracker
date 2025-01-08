'use client'

import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect, useRef } from 'react'

interface ModalProps {
  children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const router = useRouter()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  const closeModal = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
    e.target === dialogRef.current && router.back()
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={closeModal}
      onClose={router.back}
      className='backdrop:bg/black backdrop:backdrop-blur-sm rounded-md text-3xl w-full max-w-[700px] p-5'
    >
      <div>{children}</div>
    </dialog>
  )
}

export default Modal
