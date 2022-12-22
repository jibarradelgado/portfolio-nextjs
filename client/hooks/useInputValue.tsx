import React, { useState } from 'react'

export const useInputValue = (initialValue: string | number) => {
  const [value, setValue] = useState(initialValue)
  const onChange = ({target}: React.ChangeEvent<HTMLInputElement>) => setValue(target.value)

  return { value, onChange, setValue }
}