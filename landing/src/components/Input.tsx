import { ChangeEvent } from 'react'

// Input component. Allows users to input values.

interface InputProps {
  id: string
  name?: string
  type?: string
  value?: string
  placeholder?: string
  required?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<InputProps> = ({
  id,
  name,
  type,
  value,
  placeholder,
  onChange,
  required,
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      className='w-full rounded-md text-sm h-9 px-3 py-2 mb-4'
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}
