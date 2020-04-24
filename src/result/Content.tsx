import React, { FunctionComponent, useCallback } from 'react'
import { Box, Container } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { useRouter } from 'next/router'
import useGiphyId from './useGiphyId'

const Content: FunctionComponent = () => {
  const router = useRouter()
  const { query: { id } } = router
  const onClick = useCallback(() => router.back(), [router])
  const { data } = useGiphyId(id as string)
  return (
    <Container>
      <Button onClick={onClick}>Back</Button>
      <Box display="flex" justifyContent="center">
      {data && data.data && <video muted autoPlay loop>
        <source src={data.data[0].images.original.mp4} type="video/mp4" /> 
        <source src={data.data[0].images.original.webp} type="image/webp" /> 
      </video>}
      </Box>


    </Container>
  )
}

export default Content
