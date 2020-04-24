import react, { FunctionComponent, useEffect, useMemo } from 'react'
import { GridList, GridListTile, Paper, Typography } from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { MultiResponse } from 'giphy-api'
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: '10px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: '100%',
      height: '100vh',
    },
  }),
);

const Results: FunctionComponent<{ data?: MultiResponse,}> = ({ data }) => {
  const classes = useStyles();
  const router = useRouter()
  const callbacks = useMemo(() => {
    if (data.data) {
      return data.data.map(({ id }) => () => router.push('/result/[id]', `/result/${id}`))
    }
  }, [data.data])

  
  return (
    <div className={classes.root}>
      <GridList cellHeight={200} className={classes.gridList} cols={4}>
        {data && data.data.map(({ title, images }, index) => (
          <GridListTile key={title}>
            <video muted autoPlay loop onClick={callbacks[index]}>
              <source src={images.fixed_height.mp4} type="video/mp4" /> 
              <source src={images.fixed_height.webp} type="image/webp" /> 
            </video>
          </GridListTile>
        ))}
      </GridList>
    </div>

  )
}

export default Results