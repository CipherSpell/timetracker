'use client'

import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect, useRef } from 'react'

interface props {
  children: ReactNode
}

const Modal: React.FC<props> = ({ children }) => {
  const router = useRouter()
  const dialogRef = useRef<React.ElementRef<'dialog'>>(null)

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
      className='backdrop:bg/black backdrop:backdrop-blur-sm text-3xl'
    >
      <div>{children}</div>
    </dialog>
  )
}

export default Modal
