import { makeStyles, TextField } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme=>({
    headerInput: {
        margin: theme.spacing(2)
    },
    center: {
        textAlign: 'center'
    },
}))
function HTextField({value, label, onChange}) {
    const classes = useStyles()
    return (
        <TextField value={value} label={label} className={classes.headerInput} inputProps={{className:classes.center}} onChange={onChange}/>
    )
}

export default HTextField
