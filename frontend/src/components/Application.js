import React from 'react'
import {Box, makeStyles, ThemeProvider, Typography, createTheme} from '@material-ui/core'
import headerImg from '../assets/images/header.png'
import footerImg from '../assets/images/footer.png'
import Semester from './Semester'
// Change import

const useStyles = makeStyles((theme) => ({
        "root":{
            width: '100%',
            minHeight: '100%',
            textAlign: 'center'
        },
        "left": {
            textAlign: 'left'
        },
        "meta": {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        fw: {width: '100%'},
        mb3: {marginBottom: theme.spacing(3)},
        mb1: {marginBottom: theme.spacing(1)},
        ml2: {marginLeft: theme.spacing(2)},
        pt8td: {border: '1px solid black',  padding: theme.spacing(1)}
    })
)

const newTheme = createTheme({
    typography: {
        fontFamily: ["Times New Roman"]
    }
})

const pointers = [
    "University of Mumbai prescribes the curriculum and awards the Degree.",
    "All the end semester examination papers are set by University of Mumbai.",
    "The medium of instruction in this institute is English.",
    "Each academic year consists of two semesters (15 weeks each), i.e. Odd semester (July – December) and Even Semester (January – June).",
    "Each lecture, practical and tutorial unit is of 60 minutes duration.",
    "The B.E. Degree course is conducted on semester basis with eight semesters spread over four academic years.Evaluations at the end of Semesters I, II, VII, and VIII are organized by University of Mumbai, and at the end of Semester III, IV, V, and VI, the evaluations are arranged by the college on behalf of the University of Mumbai.",
    "University of Mumbai follows the GPA system of marking. At the end of every semester, the student is awarded a grade based on his/her performance in the examination and Internal Assessments in every course for that semester. The performance of a student in a semester is indicated by a number called Semester Grade Performance Index (SGPI). The SGPI is the weighted average of the grade points obtained in all the courses by the student during the semester. Minimum 40% marks are required to pass in each head of examination. The Cumulative Grade Point Index (CGPI) considers all the courses mentioned in the scheme of instructions and examinations towards the minimum requirement of the degree students have enrolled for. The CGPI is calculated at the end of the final semester by considering the average of SGPI of each semester and is indicated in the final semester grade report cards.",
]

const pt8 = [
    [
        "Scheme of Instructions",
        "SOI",
    ],
    [
        "Lecture - Hours / week",
        "L",
    ],
    [
        "Practical - Hours / week",
        "P",
    ],
    [
        "Tutorial - Hours / week",
        "T",
    ],
    [
        "Not Applicable",
        "-",
    ],
    [
        "Course Code",
        "CC",
    ],
    [
        "Course Credit",
        "C.Cr.(C)",
    ],
    [
        "Grade Point Awarded",
        "GPA(G)",
    ],
    [
        "Semester Grade Point Index",
        "SGPI",
    ],
    [
        "Cumulative Grade Point Index",
        "CGPI",
    ],
]
const pt9 = [
    ["80.00 and above", "O", "10", "Outstanding"],
    ["75.00 - 79.99", 	"A", 	"9", 	"Excellent" ],
    ["70.00 - 74.99",	"B", 	"8", 	"Very Good" ],
    ["60.00 - 69.99", 	'C', 	"7", 	"Good" ],
    ["50.00 - 59.99", 	"D", 	"6", 	"Fair" ],
    ["45.00 - 49.99", 	"E", 	"5", 	"Average" ],
    ["40.00 - 44.99",	"P", 	"4",	"Pass" ],
    ["Less than 40.00",  'F', "0", 	"Fail" ],
]

const cols = [1,2,3,4,5,6,7,8,9,10]

const HeaderImg = ({className}) => <img src={constants.headerUrl} className={className}/>
const FooterImg = ({className}) => <img src={constants.footerUrl} className={className}/>

function Application({data, studentName, department, transcriptDate}) {
    const classes = useStyles()
    const constants = {
        headerUrl: headerImg, footerUrl:footerImg,
        studentName: studentName,
        branch: department
    }
    return (
        <ThemeProvider theme={newTheme}>
        <div className={classes.root}>
            {/* PAGE 1 START */}
            <HeaderImg />
            <Box className={classes.meta}>
                <Typography className={classes.setFont}>
                    No.: DJSCE / Transcript /&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/ {transcriptDate.split('/')[2]}
                </Typography>
                <Typography className={classes.setFont}>
                    Date:&nbsp;&nbsp;&nbsp;&nbsp;{transcriptDate}
                </Typography>
            </Box>
            <Box className={`${classes.fw} ${classes.mb3}`}>
                <Typography className={classes.mb3}>
                    <u><b>
                        OFFICIAL TRANSCRIPT
                    </b></u>
                </Typography>
                <Typography>
                    <b>
                    BACHELOR OF ENGINEERING – UNIVERSITY OF MUMBAI
                    </b>
                </Typography>
                <Typography>
                    <b>
                    (Four Year Degree Course)
                    </b>
                </Typography>
            </Box>
            <Box className={`${classes.left} ${classes.ml2} ${classes.mb3}`}>
                <Typography className={classes.mb1}>
                    <b>
                        STUDENT'S NAME:&nbsp;&nbsp;&nbsp;&nbsp;{constants.studentName.toUpperCase()}
                    </b>
                </Typography>
                <Typography className={classes.mb1}>
                    <b>
                        COURSE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{constants.branch.toUpperCase()}
                    </b>
                </Typography>
            </Box>
            <Box className = {classes.left}>
                <Typography>
                    <i>
                        Guidelines that may help you to evaluate the transcript (For results that are declared till May 2020 examinations).
                        {/* Change date above */}
                    </i>
                    <ol>
                        {
                            pointers.map(item => <li>{item}</li>)
                        }
                        <li>Some abbreviations used in the transcripts are: 
                        <table style={{borderCollapse: 'collapse'}}>
                            <tr>
                                <th className={classes.pt8td} style={{textAlign:'center'}}>Heads</th>
                                <th className={classes.pt8td} style={{textAlign:'center'}}>Abbreviations</th>
                            </tr>
                            {
                                pt8.map(item => <tr>
                                    <td className={classes.pt8td}>{item[0]}</td>
                                    <td className={classes.pt8td}>{item[1]}</td>
                                </tr>)
                            }
                        </table>
                        </li>
                        <li>
                        The letter grades and their equivalent grade point are as given below
                        <table style={{borderCollapse: 'collapse', textAlign:'center'}}>
                            <tr>
                                <th className={classes.pt8td}>Percentage of Marks Obtained </th>
                                <th className={classes.pt8td}>Letter Grade</th>
                                <th className={classes.pt8td}>Grade Point</th>
                                <th className={classes.pt8td}>Performance</th>
                            </tr>
                            {
                                pt9.map(item => <tr>
                                    <td className={classes.pt8td}>{item[0]}</td>
                                    <td className={classes.pt8td}>{item[1]}</td>
                                    <td className={classes.pt8td}>{item[2]}</td>
                                    <td className={classes.pt8td}>{item[3]}</td>
                                </tr>)
                            }
                        </table>
                        </li>
                        <li>
                        10.	Extracurricular, Co-curricular, Scholarship and any other achievements of individual is not indicated in the transcripts.
                        </li>
                    </ol>
                </Typography>
            </Box>

            {/* PAGE 1 END */}
            {/* TRANSCRIPT TABLES START */}
            <table style={{borderCollapse: 'collapse', textAlign:'center', fontFamily:'Times New Roman'}} className={`${classes.fw} ${classes.mb3}`}>
                <tr style={{border:'1px solid black'}}>
                    <td colSpan="10">
                    <u><b>
                    Official Transcripts
                    </b></u>
                    </td>
                </tr>
                {/* Blank Row */}
                <tr>
                    {cols.map(item => <td className={classes.pt8td}></td>)}
                </tr>
                {/* Student Name */}
                <tr>
                    <td colSpan={2} className={classes.pt8td} style={{padding:0}}>Name of the Student: </td>
                    <td colSpan={4} className={classes.pt8td}>{constants.studentName}</td>
                    {cols.slice(0, 4).map(item=><td className={classes.pt8td}></td>)}
                </tr>
                {/* Blank Row */}
                <tr>
                    {cols.map(item => <td className={classes.pt8td}></td>)}
                </tr>
                {/* Mapping sem info for every semester */}
                {
                    Object.keys(data.marksheet).map(item=><Semester sem={item} semData={data.marksheet[item]} student={data.student} passedIn="03/19" remark="Successful" branch={constants.branch}/>)
                }
                {/* 3 Blank lines */}
                {
                [1,2,3].map(outerItem => <tr>
                            {cols.map(item => <td className={classes.pt8td}></td>)}
                        </tr> 
                    )
                }
                {/* Checked by... */}
                <tr>
                    <td colSpan={3} className={classes.pt8td}>Checked by: __________________</td>
                    <td className={classes.pt8td}></td>
                    <td className={classes.pt8td}></td>
                    <td className={classes.pt8td} colSpan={5}>Principal / Controller of Examinations</td>
                </tr>
                {/* Blank Row */}
                <tr>
                    {cols.map(item => <td className={classes.pt8td}></td>)}
                </tr>
                {/* Date */}
                {/* Blank Row */}
                <tr>
                    <td colSpan={2} className={classes.pt8td}>Date: __________</td>
                    {cols.slice(0,8).map(item => <td className={classes.pt8td}></td>)}
                </tr>
            </table>
            <FooterImg className={classes.mb3}/>
        </div>
        </ThemeProvider>
    )
}

export default Application
