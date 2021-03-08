
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme=>({
        fonts: {
            fontSize: 24,
            fontStyle: "normal",
            fontWeight: 600,
        },
        mainContainer: {justifyContent:'space-between'}
    })
)
function Appbar() {
    const classes = useStyles()
    return (
        <AppBar position="relative">
            <Toolbar variant="dense" className={classes.mainContainer}>
                <Typography className={classes.fonts} variant="h6" color="inherit">
                    Title   {/* From redux store */}
                </Typography>
                <Typography className={classes.fonts}>
                    Logout  {/* onclick dispatch action to logout from store */}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Appbar
