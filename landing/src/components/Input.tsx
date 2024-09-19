import { ChangeEvent } from 'react'

// Input component. Allows users to input values.

interface InputProps {
  id: string
  name?: string
  type?: 'password'
  value?: string
  placeholder?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<InputProps> = ({
  id,
  name,
  type,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      className='w-full rounded-md text-sm h-9 px-3 py-2 mb-4'
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}
