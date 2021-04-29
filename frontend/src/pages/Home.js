import React from 'react'
import { useSelector } from 'react-redux'
import StudentViewall from './StudentViewall'
import ManagementAll from './ManagementAll';

function Home() {
    const isManagement = useSelector(state=>state.user.is_management)
    return (
        isManagement?<ManagementAll />: <StudentViewall />
    )
}

export default Home
