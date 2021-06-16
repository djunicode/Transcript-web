import {React,useEffect,useState} from 'react'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import { FormControl, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile } from '../redux';

const useStyles = makeStyles((theme)=>({
    root:{
        marginTop:theme.spacing(1.5),
        fontFamily:"dosis",
        fontSize:"1.1rem",
        fontWeight: 300,
    },
    header:{
        fontSize:'2rem',
        fontWeight: 500
    }
}))

function PersonalDetails({errors}) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const isFaculty = useSelector(state => state.user.is_management)
    const settings = useSelector(state => state.settings)
    const fields = [
        ['Full Name', 'name'], 
        // [isFaculty?'STAFF ID':'SAP ID', isFaculty?'staff_id':'sap_id'],
        [isFaculty?null:'Academic Year', isFaculty?null: 'admission_year'],
        ['Contact Number', 'contact_no']
        ]
    const handleChange = (key, value) => {
        dispatch(editProfile({key, value}))
    }
    return (
        <Grid item xs={12}>
            <Typography className={classes.header}>
                Personal Details   
            </Typography>

            {/* form */}
            <FormControl fullWidth>
            {
            fields.map((item, idx)=>(item?<div key={idx}>
                <Typography className={classes.root}>
                    {item[0]}
                </Typography>
                <TextField id={item[0]} fullWidth
                value = {settings[item[1]] || ""}
                error = {errors[item[1]]}
                InputProps={{
                    endAdornment:(
                        <InputAdornment position="end"><CreateIcon/></InputAdornment>
                    )
                }}
                onChange={(e) => handleChange(item[1], e.target.value)}
                />
            </div>
            :null)
            )
            }
            </FormControl>
        </Grid>
    )
}

export default PersonalDetails
