import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import WatchImage from '../assets/images/watch.png'

const useStyles = makeStyles(theme=>({
        image:{maxHeight:'100%', maxWidth: '100%'},
        txt:{fontWeight: 'bold', fontSize: '2rem'}
    })
)

function StudentLoading() {
    const classes = useStyles()
    return (
        <Grid item align="center">
            <img src={WatchImage} alt="loading" className={classes.image} />
            <Typography className={classes.txt}> Please wait while your marksheet is being uploaded </Typography>
        </Grid>
    )
}

export default StudentLoading
