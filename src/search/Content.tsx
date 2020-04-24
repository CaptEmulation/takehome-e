import React, { FunctionComponent, useCallback } from 'react'
import { Box, Container } from '@material-ui/core'
import Prefix from './Prefix'
import Count from './Count'
import Results from './Results'
import useGiphySearch, { Provider } from './useGiphySearch'

const Consumer: FunctionComponent = () => {
  const {
    state,
    actionCreators,
    dispatch,
    error,
    loading,
    data,
  } = useGiphySearch()

  const onPrefixChange = useCallback(
    (prefix: string) => {
      dispatch(actionCreators.updatePrefix(prefix))
    },
    [dispatch, actionCreators]
  )
  const onCountChange = useCallback(
    (count: number) => {
      dispatch(actionCreators.updateCount(count))
    },
    [dispatch, actionCreators]
  )

  return (
    <Container>
      <Box display="flex" marginTop="10%">
        <Box flexGrow={1} paddingRight="10px">
          <Prefix
            loading={loading}
            value={state.prefix}
            onChange={onPrefixChange}
            results={data && data.data && data.data.map(d => d.title)}
          />
        </Box>

        <Box marginLeft="10px" width="100px">
          <Count value={state.count} onChange={onCountChange} />
        </Box>
      </Box>
      {data && data.data && (
        <Results data={data} />
      )}
    </Container>
  )
}

const Content: FunctionComponent = () => {
  return (
    <Provider count={10}>
      <Consumer />
    </Provider>
  )
}

export default Content
