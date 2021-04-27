import { Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import Template from '../components/Template'
import TranscriptGridItem from '../components/TranscriptGridItem'
import { API_BASE } from '../consts'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserApplicationsSuccess } from '../redux'
import { generateHeaders } from '../utils'
function StudentViewall() {
    const dispatch = useDispatch()
    const applications = useSelector(state=>state.studentDashboard.applications)
    useEffect(()=>{
        axios.get(`${API_BASE}/api/student/applications/`, generateHeaders(localStorage.getItem('accessToken')))
        .then(res=>{
            dispatch(fetchUserApplicationsSuccess(res.data.application.application))
        })
        .catch(err=>console.log(err.response))
    },[])
    return (
        <Template title="Dashboard">
            <Grid item container >
            {applications.map((item, idx)=>(
                <TranscriptGridItem key={idx} 
                    title="Transcript Application" 
                    subtitle={`Created at ${item.created_at.split('T')[0]}`}
                    status={item.Faculty?item.accepted?"Accepted":"Rejected":"Pending"}
                />
                )
            )}
            </Grid>
        </Template>
    )
}

export default StudentViewall
