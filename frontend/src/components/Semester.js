import React from 'react'
import { makeStyles } from '@material-ui/core'

const toNumeral = ({1: "I", 2: "II", 3:"III", 4: "IV", 5: "V", 6:"VI", 7:"VII", 8:"VIII"})

const useStyles = makeStyles((theme) => ({
    fw: {width: '100%'},
    mb3: {marginBottom: theme.spacing(3)},
    mb1: {marginBottom: theme.spacing(1)},
    ml2: {marginLeft: theme.spacing(2)},
    pt8td: {border: '1px solid black',  padding: theme.spacing(1)}
})
)

const cols = ["Sr. No.", "CC", "Course Title", "L", "P", "T", "C.Cr.(C)","Gr","GPA (G)","CxG"]

function Semester({sem, semData, student, passedIn, remark, branch}) {
    const classes = useStyles()
    return (
        <>
            <tr>
                <td colSpan={3} className={classes.pt8td} style={{textAlign:'left'}}>Semester: {toNumeral[sem]} ({sem<=2?"Common for all Branches":branch})</td>
                {cols.slice(0,7).map(item=><td className={classes.pt8td}></td>)}
            </tr>
            <tr>
                {cols.map(item=><td className={classes.pt8td}></td>)}
            </tr>
            <tr>
                <td colSpan={2} className={classes.pt8td} style={{textAlign:'left'}}>Seat No.:</td>
                <td className={classes.pt8td}> {student} </td>
                {cols.slice(0,2).map(item=><td className={classes.pt8td}></td>)}
                <td className={classes.pt8td}> Passed in: </td>
                <td className={classes.pt8td}> {passedIn} </td>
                {cols.slice(0,3).map(item=><td className={classes.pt8td}></td>)}
            </tr>
            <tr>
                <td className={classes.pt8td} colSpan={3}></td>
                <td className={classes.pt8td} colSpan={3}>SOI</td>
                <td className={classes.pt8td} colSpan={4}></td>
            </tr>
            <tr>
                {cols.map(item => <td className={classes.pt8td}>{item}</td>)}
            </tr>
            {
                semData.subject.map(
                    (item, idx) => { 
                        const lpt = item.course_code.charAt(item.course_code.length - 4)
                        return (<tr key={idx}>
                                <td className={classes.pt8td}>
                                    {idx+1}
                                </td>
                                <td className={classes.pt8td}>
                                    {item.course_code}
                                </td>
                                <td className={classes.pt8td}>
                                    {item.course_name}
                                </td>
                                <td className={classes.pt8td}>
                                    {lpt==="C"?item.credits_earned:null}
                                </td>
                                {
                                    item.course_name.includes('Laboratory & Tutorial')?
                                    <td colSpan={2} className={classes.pt8td}>
                                        {item.credits_earned}
                                    </td>:
                                    <>
                                    <td className={classes.pt8td}>
                                        {lpt==="L"?item.credits_earned:null}
                                    </td>
                                    <td className={classes.pt8td}>
                                        {lpt==="T"?item.credits_earned:null}
                                    </td>
                                    </>
                                }
                                <td className={classes.pt8td}>
                                    {item.credits_earned}
                                </td>
                                <td className={classes.pt8td}>
                                    {item.grade}
                                </td>
                                <td className={classes.pt8td}>
                                    {item.pointer}
                                </td>
                                <td className={classes.pt8td}>
                                    {item.cg}
                                </td>
                            </tr>
                        )
                    }
                )
            }
            <tr>
                <td className={classes.pt8td}></td>
                <td className={classes.pt8td}></td>
                <td className={classes.pt8td}>Total</td>
                <td className={classes.pt8td}></td>
                <td className={classes.pt8td}></td>
                <td className={classes.pt8td}></td>
                <td className={classes.pt8td}>
                    {semData.subject.reduce((accumulator, current) => accumulator + parseInt(current.credits_earned), 0)}
                </td>
                <td className={classes.pt8td}></td>
                <td className={classes.pt8td}></td>
                <td className={classes.pt8td}>
                {semData.subject.reduce((accumulator, current) => accumulator + parseInt(current.cg), 0)}
                </td>
            </tr>
            {/* Remarks */}
            <tr>
                <td colSpan={2} className={classes.pt8td}>
                    Remarks :
                </td>
                <td className={classes.pt8td}>
                    {remark}
                </td>
                {cols.slice(0,5).map(item=><td className={classes.pt8td}></td>)}
                <td className={classes.pt8td}>SGPI:</td>
                <td className={classes.pt8td}>{semData.cgpa}</td>
            </tr>
            <tr>
                <td colSpan={10} className={classes.pt8td}></td>
            </tr>
        </>
    )
}

export default Semester
