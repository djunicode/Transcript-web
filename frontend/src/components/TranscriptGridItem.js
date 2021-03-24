import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import  TranscriptSVG from '../assets/svg/transcript_grid_item.svg'

function TranscriptGridItem({title, subtitle, status}) {
    return (
        <Grid item container align="center" justify="center" xs={6} sm={4} md={3} lg={2}>
            <Grid item>
                <img src={TranscriptSVG} alt="Transcript Icon" width="95%" height="95%"/>
            </Grid>
            <Grid item>
                <Typography variant="subtitle2" align="center">{title}</Typography>
                <Typography variant="subtitle2" align="center">{subtitle}</Typography>
                <Typography variant="subtitle2" align="center">{status}</Typography>
            </Grid>
        </Grid>
    )
}

export default TranscriptGridItem
