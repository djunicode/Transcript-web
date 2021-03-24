import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { URLS } from '../consts'

function ProtectedRoute(props) {
    const token = useSelector(state=>state.user.accessToken)
    /*
        If token exists: user is logged so show child components
        Else: redirect to login page
    */
    return (
        <Route exact={props.exact} path = {props.path} 
            render={
                () =>  token ? props.children : <Redirect to={URLS.login} />
            }
        />
    )
}

export default ProtectedRoute
