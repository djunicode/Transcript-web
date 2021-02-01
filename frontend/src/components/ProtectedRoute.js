import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

function ProtectedRoute(props) {
    const token = useSelector(state=>state.user.token)
    /*
        If token exists: user is logged so show child components
        Else: redirect to login page
    */
    return (
        <Route exact={props.exact} path = {props.path} 
            render={
                () =>  token ? props.children : <Redirect to="/login" />
            }
        />
    )
}

export default ProtectedRoute
