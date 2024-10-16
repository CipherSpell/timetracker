import { MouseEventHandler, ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: string
  type?: 'button' | 'submit'
  onClick?: MouseEventHandler<HTMLElement>
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  type,
  onClick,
}) => {
  return (
    <button
      className={
        variant === 'primary'
          ? 'rounded-full bg-blue-200 p-3 px-6 text-xs hover:bg-blue-300'
          : 'rounded-full bg-blue-400 p-3 px-6 text-xs hover:bg-blue-500'
      }
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
