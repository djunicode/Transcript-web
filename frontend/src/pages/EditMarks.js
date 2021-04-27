import { Box, Button, Grid, Input, makeStyles, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import Template from '../components/Template'
import { API_BASE, URLS } from '../consts'
import { editMarks } from '../redux'
import { generateHeaders } from '../utils'
import axios from 'axios'
const useStyles = makeStyles((theme)=>({
        box: {
            margin: theme.spacing(1),
            padding: theme.spacing(2),
            width: '80%',
            [theme.breakpoints.down('xs')]: {
                padding: 0, margin: 0, marginTop: theme.spacing(4)
            }
        },
        typography: {
            textAlign: 'left'
        },
        fw: {
            width: '100%'
        },
        input: {
            borderBottom: `6px solid ${theme.palette.primary.main}`
        },
        topText: {
            margin:theme.spacing(3),
        },
        my: {
            marginTop: theme.spacing(8),
            marginBottom: theme.spacing(4) //For mobile
        }
    })
)
function EditMarks() {
    const arr = useSelector(state=> (state.marksExtractor.marks.courses || []))
    const classes = useStyles()
    const dispatch = useDispatch()
    const handleChange = (idx, newMarks) => {
        dispatch(editMarks(idx, newMarks))
    }
    const marksheet = useSelector(state => state.marksExtractor.marks)
    const history = useHistory()
    const saveChanges = () => {
        axios.post(API_BASE+'/api/student/marks/', {marksheet:marksheet}, generateHeaders(localStorage.getItem('accessToken')))
        .then(res => {
            history.push(URLS.transcript.viewAll)
        })
        .catch(err => console.log(err.response))
    }
    return (
        <Template title="Edit Marks">
            <Typography variant="h3" gutterBottom className={classes.topText}>Check your marks</Typography>
            <Grid container align="center">
                {
                    arr.map((item,idx)=>(
                        <Grid item key={idx} xs={12} lg={6}>
                            <Box className={classes.box}>
                                <Typography variant="h4" className={classes.typography}>{item.course_name}</Typography>
                                <TextField onChange={(e)=>handleChange(idx, e.target.value)} color="primary" type="text" value={item.marks} fullWidth/> {/* inputProps={{className:classes.input}}*/}
                            </Box>
                        </Grid>
                        )
                    )
                }
            </Grid>
            <Grid container justify="center" className={classes.my}>
                <Grid item>
                    <Button variant="outlined" onClick={saveChanges}>Save</Button>
                </Grid>
            </Grid>
        </Template>
    )
}

export default EditMarks
