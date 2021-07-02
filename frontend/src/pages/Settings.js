import React, { useEffect, useState } from 'react'
import Template from '../components/Template'
import PersonalDetails from '../components/PersonalDetails'
import { Grid, Switch, FormControlLabel, makeStyles, Button } from '@material-ui/core'
import { editProfile, toggleTheme } from '../redux'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { API_BASE } from '../consts'
import { generateHeaders, ValidateAY, ValidatePhone } from '../utils'

const useStyles = makeStyles(theme=>({
        btn: {
            background: theme.palette.primary.light,
            borderRadius: 5,
        }
    })
)
function Settings() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const is_management = useSelector(state=>state.user.is_management)
    const darkTheme = useSelector(state=>state.settings.darkTheme)
    const [errors, setErrors] = useState({ name: false, 
        contact_no: false, department: false, admission_year: false
    })
    const settings = useSelector(state => state.settings)
    const URL = is_management?'/api/management/profile/':'/api/student/profile/'
    const headers = generateHeaders(localStorage.getItem('accessToken'))
    useEffect(() => {
        axios.get(`${API_BASE}${URL}`, headers)
        .then(res=>{
            Object.keys(res.data.profile).map(
                (key) => {
                    dispatch(editProfile({key:key, value:res.data.profile[key]}))
                }
            )
        })
        .catch(err=>{console.log(err.response)})
    }, [])

    const saveChanges = () => {
        let newErrs = {}
        let b = false
        if(!ValidateAY(settings.admission_year)){
            newErrs['admission_year'] = true
            b = true
        }
        if(!ValidatePhone(settings.contact_no)){
            newErrs['contact_no'] = true
            b = true
        }
        if(settings.name.length === 0){
            newErrs['name'] = true
            b = true
        }
        /*
        if(is_management){
            if(settings.staff_id.length === 0){
                newErrs['staff_id'] = true
                b = true
            }
        } else {
            if(!/^\d{11}$/.test(settings.sap_id)){
                newErrs['sap_id'] = true
                b = true
            }
        }
        */
        if(b) {
            setErrors({...errors, ...newErrs})
        } else {
            // Valid
            const content = {...settings}
            delete content['darkTheme']
            // console.log("Valid", content)
            axios.put(`${API_BASE}${URL}`, content, headers)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response))
        }
    }

    return (
        <Template title="Settings">
            <Grid container>
                <Grid container item xs={12} sm={6}>
                    <PersonalDetails errors={errors} />
                </Grid>
                <Grid container item xs={12} sm={6}>
                    <Grid container item xs={12} justify="center" alignContent="center">
                        <FormControlLabel
                        control={
                            <Switch 
                            checked={darkTheme} onChange={() => dispatch(toggleTheme())} 
                            name="darkMode"color="primary"
                            />
                        }
                        label="Dark Theme"
                        />
                    </Grid>
                    <Grid container item xs={12} justify="center" alignContent="flex-end">
                        <Button variant="contained" className={classes.btn} onClick={saveChanges}>
                            Save Changes
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Template>
    )
}

export default Settings
