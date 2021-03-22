import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import  TranscriptSVG from '../assets/svg/transcript_grid_item.svg'

function TranscriptGridItem({title, subtitle}) {
    return (
        <Grid item xs={6} sm={4} md={3} lg={2}>
            <img src={TranscriptSVG} width="95%" height="95%"/>
            <Typography variant="subtitle2" align="center">{title}</Typography>
            <Typography variant="subtitle2" align="center">{subtitle}</Typography>
        </Grid>
    )
}

export default TranscriptGridItem
