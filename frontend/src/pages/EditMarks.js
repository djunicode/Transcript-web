import { Box, Button, Grid, InputBase, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import Template from '../components/Template'
import { API_BASE, URLS } from '../consts'
import { editHeading, editMarks } from '../redux'
import { generateHeaders } from '../utils'
import axios from 'axios'
import HTextField from '../components/HTextField'
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
        topText: {
            margin:theme.spacing(3),
        },
        my: {
            marginTop: theme.spacing(8),
            marginBottom: theme.spacing(4) //For mobile
        },
        table: {
            minWidth: 650
        }
    })
)
function EditMarks() {
    const marksExtractor = useSelector(state=> (state.marksExtractor || {}))
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const sem = Object.keys(marksExtractor)[0] //Only 1 sem's marks will be in redux store at any time
    const marks = marksExtractor[sem]
    const handleChange = (idx, key, newVal) => {
        dispatch(editMarks(idx, key, newVal))
    }
    const changeHeaders = (key, value) => {
        dispatch(editHeading(key, value))
    }
    const saveChanges = () => {
        axios.post(API_BASE+'/api/student/marks/', {marksheet:marksExtractor}, generateHeaders(localStorage.getItem('accessToken')))
        .then(res => {
            history.push(URLS.transcript.viewAll)
        })
        .catch(err => console.log(err.response))
    }
    const TableHeadings = ['Course Code', 'Course Name', 'Credits Earned', 'Grade', 'Pointer', 'C*G']
    return (
        <Template title="Edit Marks">
            <Typography variant="h3" gutterBottom className={classes.topText}>Check extracted data</Typography>
            <Grid container align="center">
                <Grid item xs={12}>
                    <HTextField value={sem} label="Semester" onChange={null}/>
                    <HTextField value={marks.cgpa} label="CGPA" onChange={(e)=>changeHeaders("cgpa", e.target.value)}/>
                </Grid>
                <TableContainer component={Box}>
                    <Table className={classes.table}>
                        <colgroup>
                            <col style={{width:'20%'}}/>
                            <col style={{width:'40%'}}/>
                        </colgroup>
                        <TableHead>
                            <TableRow>
                            {
                                TableHeadings.map((item, idx)=>(
                                    <TableCell key={idx} align="left">
                                        {item}
                                    </TableCell>
                                    )
                                )
                            }
                            </TableRow>
                        </TableHead>
                        {/* ['Course Code', 'Course Name', 'Marks', 'Pointer', 'Credits Earned', 'Grade'] */}
                        <TableBody>
                            {
                                marks.subject.map((item,idx)=>(
                                        <TableRow key={idx}>
                                            {
                                                Object.keys(item).map((key, itemIdx)=>(
                                                        <TableCell align="left" key={itemIdx}>
                                                            <InputBase className={classes.fw} value={item[key]} onChange={(e)=>handleChange(idx, key, e.target.value)}/>
                                                        </TableCell>
                                                    )
                                                )
                                            }
                                        </TableRow>
                                    )
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
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
