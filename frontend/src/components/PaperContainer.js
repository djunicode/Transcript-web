import { fade, makeStyles, Paper } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme=>({
        paperContainer: {
            padding: theme.spacing(4),
            margin: theme.spacing(3),
            backgroundColor: fade(theme.palette.primary.main, 0.4), //40%
            minHeight: '50vh',
            flexGrow: 1, borderRadius: theme.spacing(3),
            [theme.breakpoints.down('xs')]: {
                padding: theme.spacing(1.25), margin: theme.spacing(1), marginTop: theme.spacing(2)
            }
        },
    })
)

function PaperContainer({children, className}) {
    const classes = useStyles()
    return (
        <Paper className={`${classes.paperContainer} ${className}`}>
            {children}
        </Paper>
    )
}

export default PaperContainer
