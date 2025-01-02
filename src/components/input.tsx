import { HTMLInputTypeAttribute } from 'react'

export const Input = ({
  type,
  id,
  className,
  value,
  onChange,
  auto,
  onFocus,
}: {
  type: HTMLInputTypeAttribute
  id: string
  className?: string
  value?: any
  onChange?: any
  auto?: any
  onFocus?: any
}) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className={`text-xs text-[#37f7d7] bg-[#868686] px-2 py-1 outline-none ${className}`}
      autoComplete={auto}
      onFocus={onFocus}
    />
  )
}
