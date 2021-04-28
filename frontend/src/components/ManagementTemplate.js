import { Grid, makeStyles, Paper } from '@material-ui/core'
import React from 'react'
import Appbar from './Appbar'
import SideNavManagement from './SideNavManagement'
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles(theme=>({
        paperContainer: {
            padding: theme.spacing(4),
            margin: theme.spacing(3),
            backgroundColor: fade(theme.palette.primary.main, 0.4), //40%
            flexGrow: 1, borderRadius: theme.spacing(3)
        },
        nestedContainer: {
            flexGrow: 1, display: 'flex', flexDirection:'column'
        }
    })
)
function Template({children}) {
    const classes = useStyles()
    return (
        <Grid container>
            <Grid item xs={12} sm={4} md={3} lg={2}>
                <SideNavManagement />
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} className={classes.nestedContainer}>
                <Grid item>
                    <Appbar />
                </Grid>
                <Grid item className={classes.nestedContainer}>
                    <Paper className={classes.paperContainer}>
                        {children}
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Template
