import React, { ChangeEvent, FunctionComponent, useCallback } from 'react'
import { FormControl, InputLabel, OutlinedInput } from '@material-ui/core'

const Count: FunctionComponent<{
  value: number
  onChange(count: number): void
}> = ({ value, onChange }) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(event.currentTarget.value)
      if (newValue > 0) {
        onChange(newValue)
      }
    },
    [onChange]
  )
  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="count">Count</InputLabel>
      <OutlinedInput
        id="count"
        value={value}
        onChange={handleChange}
        label="count"
      />
    </FormControl>
  )
}

export default Count
