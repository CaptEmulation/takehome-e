import react, { FunctionComponent } from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import { MultiResponse } from 'giphy-api'

const Results: FunctionComponent<{ data?: MultiResponse }> = ({ data }) => {
  return (
    <Grid container spacing={1}>
      {data && data.data.map(({ title, images }) => (
        <Grid item xs={4}>
          <Paper>
            <Typography>
              {title}
            </Typography>
            <video muted autoPlay>
              <source src={images.fixed_width.mp4} type="video/mp4" /> 
              <source src={images.fixed_width.webp} type="image/webp" /> 
            </video>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}

export default Results