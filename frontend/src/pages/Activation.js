import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router'
import { API_BASE, URLS } from '../consts'

function Activation() {
    const { uid, token } = useParams()
    const [state, setState] = useState(0)
    useEffect(()=>{
        axios.post(`${API_BASE}/api/activate/`, {uid, token})
        .then(res => setState(1))
        .catch(err => setState(-1))
    }, [])
    
    return (
        state===1?<Redirect to={URLS.login} />:state===0?<h1>Loading...</h1>:<h1>Failed</h1>
    )
}

export default Activation
