import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import Appbar from './Appbar'
import SideNav from './SideNav'
import PaperContainer from './PaperContainer';

const useStyles = makeStyles(theme=>({
        nestedContainer: {
            flexGrow: 1, display: 'flex', flexDirection:'column'
        }
    })
)
function Template({children, title}) {
    const classes = useStyles()
    return (
        <Grid container>
            <Grid item xs={12} sm={4} md={3} lg={2}>
                <SideNav />
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} className={classes.nestedContainer}>
                <Grid item>
                    <Appbar title={title}/>
                </Grid>
                <Grid item className={classes.nestedContainer}>
                    <PaperContainer>
                        {children}
                    </PaperContainer>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Template
