import { Box, Button, Grid, Input, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Template from '../components/Template'
import { API_BASE, URLS } from '../consts'
import { generateHeaders } from '../utils'
import StudentLoading from '../components/StudentLoading'
import { extractMarksSuccess } from '../redux'
import { useDispatch } from 'react-redux'
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
            justifyContent:'flex-end', alignItems: 'flex-end',
            borderBottom: `6px solid ${theme.palette.primary.light}`
        },
        labelBtn: {
            backgroundColor: theme.palette.primary.light,
            padding: theme.spacing(1),
            borderRadius: theme.spacing(1)
        },
        preText: { flex: 1, textAlign: 'left', fontSize: '1.2rem' }
    })
)
function UploadMarksheet() {
    const arr = ["Semester I", "Semester II", "Semester III", "Semester IV", "Semester V", "Semester VI", "Semester VII", "Semester VIII"]
    const history = useHistory()
    const [bools, setBools] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        axios.get(`${API_BASE}/api/marksheet/status/`, generateHeaders(localStorage.getItem('accessToken')))
        .then(res => {
            const newBools = [false, false, false, false, false, false, false, false]
            res.data.marksheets.map(item => newBools[item - 1] = true)
            setBools(newBools)
        })
        .catch(err => console.log(err.response))
    }, [])
    const classes = useStyles()
    const dispatch = useDispatch()
    const handleUpload = (e, sem) => {
        setLoading(true)
        var formData = new FormData();
        formData.append('file', e.target.files[0])
        formData.append('semester', sem)
        axios.post(API_BASE+'/api/student/scan_marksheet/',formData, generateHeaders(localStorage.getItem('accessToken')))
        .then(res => {
                // setTimeout(2000)
                console.log("RES:", res.data)
                setLoading(false)
                dispatch(extractMarksSuccess(res.data))
                history.push(URLS.transcript.editMarks)
            }
        )
    }
    if(loading){ return <Template><StudentLoading /></Template>}
    return (
        <Template title="Upload Marksheet">
            <Grid container align="center">
                {
                    arr.map((item,idx)=>(
                        <Grid item key={idx} xs={12} lg={6}>
                            <Box className={classes.box}>
                                <Typography variant="h4" className={classes.typography}>{item}</Typography>
                                {/* <Input type="file" className={classes.fw} /> */}
                                <Button variant="text" component="label" className={`${classes.fw} ${classes.input}`}>
                                    <Typography className={classes.preText}>
                                        {bools[idx]?"Already uploaded":"No file chosen"}
                                    </Typography>
                                    <input accept="application/pdf" type="file" onChange={(e) => handleUpload(e, idx+1)} hidden/>
                                    <Typography className={classes.labelBtn}>
                                    {bools[idx]?"Reupload":"Upload"}
                                    </Typography>
                                </Button>
                            </Box>
                        </Grid>
                        )
                    )
                }
            </Grid>
        </Template>
    )
}

export default UploadMarksheet
