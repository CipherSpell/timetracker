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
          ? 'rounded-full bg-blue-200 w-full py-2 text-xs hover:bg-blue-300 font-bold text-black'
          : 'rounded-full bg-red-300 w-full py-2 text-xs hover:bg-red-500 font-bold text-black'
      }
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
