import React, {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useState,
  useEffect,
} from 'react'
import { useRouter } from 'next/router'
import { Autocomplete } from '@material-ui/lab'
import useDebounce from './useDebounce'
import CircularProgress from '@material-ui/core/CircularProgress'
import qs from 'querystring'
import {
  createFilterOptions,
  AutocompleteCloseReason,
} from '@material-ui/lab/Autocomplete'
import { Typography, TextField } from '@material-ui/core'

const Prefix: FunctionComponent<{
  value: string
  loading: boolean
  onChange(prefix: string): void
  results: string[]
}> = ({ value, loading, onChange, results = [] }) => {
  const router = useRouter()
  const [pendingValue, setPendingValue] = useState(value)
  const settledValue = useDebounce(pendingValue, 100)
  useEffect(() => {
    onChange(settledValue)
  }, [onChange, settledValue])
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPendingValue(event.target.value)
    },
    [setPendingValue]
  )

  const handleClose = useCallback(
    (
      event: ChangeEvent<HTMLTextAreaElement>,
      reason: AutocompleteCloseReason
    ) => {
      if (reason === 'toggleInput') {
        return
      }
      if (reason === 'select-option') {
        router.push(
          `/file?${qs.stringify({
            path: event.currentTarget.textContent,
          })}`
        )
      } else {
        onChange(pendingValue.trim())
      }
    },
    [onChange, pendingValue]
  )
  return (
    <Autocomplete
      freeSolo
      autoSelect
      loading={loading}
      openOnFocus
      onClose={handleClose}
      options={results}
      inputValue={pendingValue}
      filterOptions={createFilterOptions()}
      getOptionLabel={(option) => option}
      renderOption={(option, { selected }) => <Typography>{option}</Typography>}
      renderInput={(params) => {
        return (
          <TextField
            variant="outlined"
            {...params}
            onChange={handleChange}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )
      }}
    />
  )
}

export default Prefix
