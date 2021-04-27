
import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { URLS } from '../consts'
import { logout } from '../redux'

const useStyles = makeStyles(theme=>({
        fonts: {
            fontSize: 24,
            fontStyle: "normal",
            fontWeight: 600,
        },
        mainContainer: {justifyContent:'space-between'}
    })
)
function Appbar({title}) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
    const history = useHistory()
    const handleLogin = () => {
        history.push(URLS.login)
    }
    const token = useSelector(state=>state.user.accessToken)
    return (
        <AppBar position="relative">
            <Toolbar variant="dense" className={classes.mainContainer}>
                <Typography className={classes.fonts} variant="h6" color="inherit">
                    {title}
                </Typography>
                <Typography>
                    <Button className={classes.fonts} onClick={token?handleLogout:handleLogin}>
                        {token?"Logout":"Login"}
                    </Button>  {/* onclick dispatch action to logout from store */}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Appbar
