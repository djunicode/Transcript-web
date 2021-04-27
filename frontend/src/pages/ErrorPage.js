import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Appbar from '../components/Appbar'
import ErrorImage from '../assets/images/error_page.png'
import PaperContainer from '../components/PaperContainer'
const useStyles = makeStyles(theme=>({
        root: {minHeight: '100vh', height: '100%', display: 'flex', flexDirection: 'column'},
        paperContainer: {
            display:'flex'
        },
        nestedContainer: {
            flexGrow: 1, display: 'flex', flexDirection:'column', justifyContent: 'center'
        },
        pad: {padding: theme.spacing(6)},
        title: {
            fontWeight: "bold",
        },
        subtitle: {
            fontSize: 36,
            fontStyle: "normal",
            fontWeight: 500,
        },
        text: {
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: 48,
        },
        imgContainer: {
            margin: 'auto',
            width: "70%",
            paddingTop: "66.66%", /* 3:2 Aspect Ratio */
            backgroundImage: `url(${ErrorImage})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            borderRadius: theme.spacing(4)
        }
    })
)
function ErrorPage({code, subtitle, text}) {
    const classes = useStyles()
    return (
        <Grid container className={classes.root}>
            <Grid item>
                <Appbar title="Error"/>
            </Grid>
            <Grid item container xs={12} className={classes.nestedContainer}>
                <PaperContainer className={classes.paperContainer}>
                    <Grid item xs={6} className={`${classes.nestedContainer} ${classes.pad}`}>
                        <Typography align="center" variant="h3" className={classes.title}>Error {code}</Typography>
                        <Typography align="center" variant="subtitle1" gutterBottom>{subtitle}</Typography>
                        <Typography align="center" variant="h4">{text}</Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.nestedContainer}>
                        <div className = {classes.imgContainer} />
                    </Grid>
                </PaperContainer>
            </Grid>
        </Grid>
    )
}

export default ErrorPage
