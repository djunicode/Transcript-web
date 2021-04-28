import { Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import ManagementTemplate from '../components/ManagementTemplate'
import TranscriptGridItem from '../components/TranscriptGridItem'
import { API_BASE } from '../consts'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchApplications } from '../redux/ManagementDashboard/actions'

function MangementAll() {
    const dispatch = useDispatch()
    const applications = useSelector(state=>state.managementDasboard.applications)
    useEffect(()=>{
        axios.get(`${API_BASE}/api/management/applications/`, {headers:{Authorization: `Bearer ${localStorage.getItem('accessToken')}`}})
        .then(res=>{
            dispatch(fetchApplications(res.data))
            console.log("then all",res)
            console.log("state all",applications)
        })
        .catch(err=>console.log("error",err))
    },[])
    return (
        <ManagementTemplate>
            <Grid item container >
            {/* {applications.map((item, idx)=>(
                <TranscriptGridItem key={idx} 
                    title="Transcript Application" 
                    subtitle={`Created at ${item.created_at.split('T')[0]}`}
                    // status={item.Faculty?item.accepted?"Accepted":"Rejected":"Pending"}
                />
                )
            )} */}
            </Grid>
        </ManagementTemplate>
    )
}

export default MangementAll
