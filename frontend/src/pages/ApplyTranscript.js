import React, { useState } from 'react'
import Template from '../components/Template'
import { Typography, Button, makeStyles } from '@material-ui/core'
import axios from 'axios'
import { API_BASE } from '../consts'
import { generateHeaders } from '../utils'

const useStyles = makeStyles(theme => ({
    btn: {
        marginTop: theme.spacing(3), marginBottom: theme.spacing(5),
        backgroundColor: theme.palette.primary.main
    }
})
)
function Initial({apply}){
    const classes = useStyles()
    return <>
        <Typography variant="h5" align="center" gutterBottom>
            Create a new transcript application by clicking the button below
        </Typography>
        <Typography align="center">
            <Button variant="contained" className={classes.btn} onClick={apply}>Apply for transcript</Button>
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
            Once you click the button, a new application will be generated
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
            This application will join a queue and wait for approval
        </Typography>
        <Typography variant="h5" align="center">
            You can view the status of your application by going to the dashboard.
        </Typography>
    </>
}

function NewCreated(){
    return <>
    <Typography variant="h4" align="center" gutterBottom>
        You have successfully created a new application which has been placed in the queue
    </Typography>
    <Typography variant="h5" align="center">
        You can view the status of your application by going to the dashboard.
    </Typography>
    </>
}
function FailedToCreate({children}){
    return <>
    <Typography variant="h4" align="center" gutterBottom>
        {children}
    </Typography>
    </>
}

function ApplyTranscript() {
    const [state, setState] = useState(0)
    // 0 -> Just initialized
    // 1 -> New application created
    // 2 -> Could not create new since there is already one in queue
    // 3 -> Could not create new due to some error
    const apply = () => {
        axios.post(`${API_BASE}/api/student/applications/`,{}, generateHeaders(localStorage.getItem('accessToken')))
        .then(res => {
            console.log(res)
            if(res.status===201){
                setState(1)
            } else if (res.status === 208){
                setState(2)
            }
        })
        .catch(err => setState(3))
    }
    return (
        <Template>
            <div style={{display:'flex', flexDirection:'column', height:'95%', justifyContent:'center'}}>
                {/* Height 95% so that justify center places it slightly above the middle of the page */}
                {
                    state===0?<Initial apply={apply}/>:
                    state===1?<NewCreated />:
                    state===2?<FailedToCreate>
                        Your application is already in the queue. You cannot create multiple applications at the same time.
                    </FailedToCreate>:
                    state===3?<FailedToCreate>
                        You cannot create a new application due to some error. Please try again later
                    </FailedToCreate>:
                    null
                }
            </div>
        </Template>
    )
}

export default ApplyTranscript
