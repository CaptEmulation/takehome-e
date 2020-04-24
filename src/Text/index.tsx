import React, { FunctionComponent } from 'react'
import { Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import useTextContents from './useTextContents'

const Text: FunctionComponent<{
  value: string
}> = ({ value }) => {
  const { error, loading, data } = useTextContents(value)
  if (error) {
    return <Typography>Error</Typography>
  }
  if (loading) {
    return <CircularProgress color="inherit" size={20} />
  }
  return <Typography component="pre">{data}</Typography>
}

export default Text
