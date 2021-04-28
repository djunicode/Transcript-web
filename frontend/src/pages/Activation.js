import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router'
import { API_BASE, URLS } from '../consts'
import PaperContainer from '../components/PaperContainer'
import { makeStyles, Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme=>({
        container: {minHeight: '95vh', display: 'flex', justifyContent: 'center', alignItems:'center'},
    })
)

function Activation() {
    const { uid, token } = useParams()
    const classes = useStyles()
    const [state, setState] = useState(0)
    useEffect(()=>{
        axios.post(`${API_BASE}/api/activate/`, {uid, token})
        .then(res => setState(1))
        .catch(err => setState(-1))
    }, [])
    
    return (
        state===1?
            <Redirect to={URLS.login} />:
            state===0?
                <PaperContainer className={classes.container}>
                    <Typography align="center">
                        <CircularProgress />
                        <Typography variant="h4">Loading...</Typography>
                    </Typography>
                </PaperContainer>:
                <PaperContainer className={classes.container}>
                    <Typography variant="h3" align="center">
                        Activation failed!
                    </Typography>
                </PaperContainer>
    )
}

export default Activation
