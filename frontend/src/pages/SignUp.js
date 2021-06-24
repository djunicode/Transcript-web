import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Switch from '@material-ui/core/Switch';
import axios from "axios";
import { API_BASE, DEPARTMENTS, URLS } from "../consts";
import {Link, useHistory} from "react-router-dom"
import { MenuItem, Select } from "@material-ui/core";
import { ValidateEmail, ValidatePhone, ValidateAY} from "../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    background: "#212020",
    fontFamily: "Dosis"
  },
  left: {
    backgroundImage: "linear-gradient(180deg, #225093 0%, #212020 143.9%)",
    minHeight: "70vh",
    borderRadius: "1rem 0 0 1rem",
  },
  right: {
    backgroundColor: "#212020",
    color: "white",
    minHeight: "70vh",
    borderRadius: "0 1rem 1rem 0",
    boxShadow: "0px 0px 39px 10px rgba(255,255,255,0.09) "
  },
  leftLanding: {
    color: "white",
    fontWeight: "700",
    width:"60%",
    
  },
  inputBase: {
    borderBottom: "0.2rem solid #5a75c8",
    marginBottom: theme.spacing(2),
    color: "white",
    marginTop: theme.spacing(-1),
    padding:"0px 0px"
  },
 
  margin: {
    marginTop: theme.spacing(2),
  },
  appInputBase:{
    borderBottom: "0.2rem solid #5a75c8",
    marginBottom: theme.spacing(2),
    color: "white",
    marginTop: theme.spacing(2),
    
  },
  link: {textDecoration: 'None', color: 'inherit'},
  // having a tough time typo
  havTypography:{
    height:"30%",width:'100%', fontWeight:700
  },
  // you are at the typo
  youTypography:{
    height:"30%",width:'80%', fontWeight:700
  },
  // mobile view grid
  mobGrid:{
    backgroundColor: "#212020",
    color: "white",
    minHeight:"105vh",
    borderRadius: "1rem",
    boxShadow: "0px 0px 39px 10px rgba(255,255,255,0.09) ",
    margin:"5% 0 5% 0",
    position:"relative", marginLeft: "auto", marginRight:"auto"
  },
  // mobile Background
  mobBackground:{
    background:"linear-gradient(to right,#255093,pink)"
  }
}));
const items = DEPARTMENTS
export default function SignupPage() {
  const [isFaculty, setIsFaculty] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPw, setConfirmPw] = useState("")
  const [name, setName] = useState("")
  const [user_id, set_id] = useState("") //Sap id or staff id
  const [contact, setContact] = useState("")
  const [department, setDepartment] = useState("")
  const [admission_year, setAdmissionYear] = useState("")
  const [formPage, setFormPage] = useState(0)
  const [open, setOpen] = useState(false) //open select
  const temp = {username:false, passwords: false, name: false, user_id:false, contact: false, dept: false, ay:false}
  const [errors, setErrors] = useState({...temp})
  const history = useHistory()

  const handleSubmit = () => {
    if(!ValidateEmail(username)){ setErrors({...errors, username:true }); return}
    if(password!==confirmPw || password==="") { setErrors({...errors, passwords:true }); return}
    const data = {
      is_management: isFaculty, email: username, password,
      re_password:confirmPw, 
      profile: {
        contact_no:contact,
        name
      }
    }
    if(isFaculty){
      data.profile.staff_id=user_id
    } else {
      data.profile.sap_id = user_id
      data.profile.department = department
      data.profile.admission_year = admission_year
    }
    axios.post(`${API_BASE}/api/auth/users/`, data)
    .then(res => history.push(URLS.login))
    .catch(err => {
      if(err.response.status===400){
        //Probably weak password
      }
    })
  }
  const handleNext = () => {
    setErrors({...temp})
    if(formPage===0){  
      if(name===""){ setErrors({...errors, name:true}); return }
      if(user_id===""){ setErrors({...errors, user_id:true}); return }
      if(!ValidatePhone(contact)){ setErrors({...errors, contact:true}); return }
      if(isFaculty)
        setFormPage(2)
      else
        setFormPage(1)
    } else if (formPage===1) {
      if(!isFaculty && !ValidateAY(admission_year)){ setErrors({...errors, ay:true}); return }
      if(!isFaculty && department===""){ setErrors({...errors, dept:true}); return }
      setFormPage(2)
    }
  }
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:700px)');
  return (
    // Main
    <Grid container className={classes.root} justify="center" alignItems="center">
      {/* Left Half */}
      {matches?
        <Grid container item xs={4} className={classes.left} justify="center" alignItems="center">
          <Grid item className={classes.leftLanding} sm={7}>
            <Typography variant="h5" className={classes.havTypography}>
              Having a tough time verifying pending documents?
            </Typography>
            <Typography variant="h4" className={classes.youTypography}>
              You're at the <u>right place</u>
            </Typography>
          </Grid>
        </Grid>:<></>   
      }
      
      {/* Right Half */}
    {matches?<Grid container item xs={4} className={classes.right}
        justify="center" alignItems="center" style={{position:"relative"}}>
        <div style={{position:"absolute",minHeight:"50px",minWidth:"50px",borderRadius:"50%",background:"linear-gradient(to right,#225093,white)",top:"15%",right:"5%"}}>
        </div>
        <div style={{position:"absolute",minHeight:"50px",minWidth:"50px",background:"linear-gradient(to right,#225093,white)",top:"5%",right:"20%",transform:"rotate(15deg)"}}>
        </div>
        <Grid item xs={7}>
          <Typography variant="h6" style={{marginBottom:"14%",marginTop:"10%", fontWeight:700}}>
            SIGN UP
          </Typography>
          {
            formPage===2?<>
              <Typography variant='caption' style={{fontWeight:500}}>
                USERNAME
              </Typography>
              <InputBase
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                label="USERNAME"
                fullWidth
                className={classes.inputBase}
              />
              <Typography variant="caption" style={{fontWeight:500}}>
                PASSWORD
              </Typography>
              <InputBase
                label="password"
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                fullWidth
                className={classes.inputBase}
              />
              <Typography variant="caption" style={{fontWeight:500}}>
                CONFIRM PASSWORD
              </Typography>
              <InputBase
                label="confirmpassword"
                type ="password"
                value={confirmPw}
                onChange={(e)=>setConfirmPw(e.target.value)}
                fullWidth
                className={classes.inputBase}
              />
            </>:formPage===1?<>
                  <Typography variant="caption" style={{fontWeight:500}}>
                    ADMISSION YEAR
                  </Typography>
                  <InputBase
                    label="ADMISSION YEAR"
                    value={admission_year}
                    onChange={(e)=>setAdmissionYear(e.target.value)}
                    fullWidth
                    className={classes.inputBase}
                  />
                  <Typography variant="caption" style={{fontWeight:500, marginRight:12}}>
                    DEPARTMENT
                  </Typography>
                  <Select
                    open={open}
                    onClose={()=>setOpen(false)}
                    onOpen={()=>setOpen(true)}
                    value={department}
                    onChange={(e)=>setDepartment(e.target.value)}
                    className={classes.inputBase}
                  >
                    {items.map((item, idx)=><MenuItem key={idx} value={item[0]}>{item[1]}</MenuItem>)}
                  </Select>
              </> : <>
              <Typography variant='caption' style={{fontWeight:500}}>
                NAME
              </Typography>
              <InputBase
                label="NAME"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                fullWidth
                className={classes.inputBase}
              />
              <Typography variant="caption" style={{fontWeight:500}}>
                {isFaculty? "STAFF ID":"SAP ID"}
              </Typography>
              <InputBase
                label="_ID"
                value={user_id}
                onChange={(e)=>set_id(e.target.value)}
                fullWidth
                className={classes.inputBase}
              />
              <Typography variant="caption" style={{fontWeight:500}}>
                CONTACT NUMBER
              </Typography>
              <InputBase
                label="CONTACT"
                value={contact}
                onChange={(e)=>setContact(e.target.value)}
                fullWidth
                className={classes.inputBase}
              />
            </>
          }  
          <div style={{display:"flex",justifyContent:"center",marginTop:"14%"}}>
            <div style={{display:'flex',flexDirection:"column",marginLeft:"auto",marginRight:"auto"}}>
              {
              formPage===2?
              <Button onClick={handleSubmit} variant="contained" color="primary" style={{objectFit:"contain",maxHeight:"40%"}}>
                Create my account
              </Button>
              :
              <Button onClick={handleNext} variant="contained" color="primary" style={{objectFit:"contain",maxHeight:"40%"}}>
                Next
              </Button>
              }
              <Typography style={{marginLeft:"auto",marginRight:"auto",marginTop:"2px", fontWeight:200, fontSize:12}}>
                Have an account?
              </Typography>
              <Link to={URLS.login} className={classes.link}>
                <Typography align="center" style={{marginLeft:"auto",marginRight:"auto",marginTop:"0px", fontWeight:200, fontSize:12}}>
                  Login
                </Typography>
              </Link>
              {
                formPage===0?
                <div style={{position:"absolute",bottom:"1%",right:"2%"}}>
                  <Switch
                    checked={isFaculty}
                    onChange={() => setIsFaculty(!isFaculty)}
                  />
                  <p style={{margin:'0',padding:'0',fontSize:"0.7rem"}}>I'm a {isFaculty?"teacher":"student"}</p>
                </div>
                : null
              }
            </div>
          </div>
        </Grid>
      </Grid>
      :
      // Mobile  view
      <Grid container className={classes.mobBackground}>
        <Grid container item xs={10} justify="center" className={classes.mobGrid}>
          <Grid item xs={10} style={{marginTop:"30%"}}>
            <div style={{position:"absolute",minHeight:"50px",minWidth:"50px",borderRadius:"50%",background:"linear-gradient(to right,#225093,white)",top:"24%",right:"6%"}}>
            </div>
            <div style={{position:"absolute",minHeight:"50px",minWidth:"50px",background:"linear-gradient(to right,#225093,white)",top:"15%",right:"7%",transform:"rotate(15deg)"}}>
            </div>
            <Typography style={{fontSize:"1.2rem",lineHeight:"1.4rem",maxWidth:"80%", fontWeight:700}} >
              Having a tough time verifying pending documents?
            </Typography>
            <Typography style={{fontSize:"2.1rem",maxWidth:"80%", fontWeight:700}} >
              You're at the <u>right place</u>
            </Typography>
            <div style={{display:'flex', alignItems:"start", flexDirection:"column",marginTop:"25%",minHeight:"300px",maxHeight:"500px"}}>
              {
                formPage===2?<>
                <Typography style={{fontWeight:500, fontSize:"0.8rem"}}>
                  USERNAME
                </Typography>
                <InputBase
                  label="USERNAME"
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                  fullWidth
                  className={classes.appInputBase}
                  style={{marginBottom:"10%"}}
                />
                <Typography style={{fontWeight:500, fontSize:"0.8rem"}}>
                    PASSWORD
                </Typography>
                <InputBase
                  type="password"
                  label="PASSWORD"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  fullWidth
                  className={classes.appInputBase}
                />
                <Typography style={{fontWeight:500, fontSize:"0.8rem"}}>
                  CONFIRM PASSWORD
                </Typography>
                <InputBase
                  type="password"
                  label="CONFIRM PASSWORD"
                  value={confirmPw}
                  onChange={(e)=>setConfirmPw(e.target.value)}
                  fullWidth
                  className={classes.appInputBase}
                />
                </>
                :
                formPage===1?
                <>
                  <Typography style={{fontWeight:500, fontSize:"0.8rem"}}>
                    ADMISSION YEAR
                  </Typography>
                  <InputBase
                    label="ADMISSION YEAR"
                    value={admission_year}
                    onChange={(e)=>setAdmissionYear(e.target.value)}
                    fullWidth
                    className={classes.appInputBase}
                  />
                  <Typography style={{fontWeight:500, fontSize:"0.8rem"}}>
                    DEPARTMENT
                  </Typography>
                  <Select
                    open={open}
                    onClose={()=>setOpen(false)}
                    onOpen={()=>setOpen(true)}
                    value={department}
                    onChange={(e)=>setDepartment(e.target.value)}
                    fullWidth
                    className={classes.appInputBase}
                  >
                    {items.map((item, idx)=><MenuItem key={idx} value={item[0]}>{item[1]}</MenuItem>)}
                  </Select>
                </>
                :
                <>
                <Typography style={{fontWeight:500, fontSize:"0.8rem"}}>
                  NAME
                </Typography>
                <InputBase
                  label="NAME"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  fullWidth
                  className={classes.appInputBase}
                  style={{marginBottom:"10%"}}
                />
                <Typography style={{fontWeight:500, fontSize:"0.8rem"}}>
                  {isFaculty?"STAFF ID":"SAP ID"}
                </Typography>
                <InputBase
                  label="_ID"
                  value={user_id}
                  onChange={(e)=>set_id(e.target.value)}
                  fullWidth
                  className={classes.appInputBase}
                />
                <Typography style={{fontWeight:500, fontSize:"0.8rem"}}>
                  CONTACT NUMBER
                </Typography>
                <InputBase
                  label="CONTACT"
                  value={contact}
                  onChange={(e)=>setContact(e.target.value)}
                  fullWidth
                  className={classes.appInputBase}
                />
                </>
              }
              
              <div style={{display:'flex',flexDirection:"column",marginLeft:"auto",marginRight:"auto",minHeight:"12rem",marginTop:"10%"}}>
                {
                formPage===2?
                <Button onClick={handleSubmit} variant="contained" color="primary" style={{height:"20%"}}>
                  Create my account
                </Button>
                :
                <Button onClick={handleNext} variant="contained" color="primary" style={{height:"20%"}}>
                  Next
                </Button>
                }
                <Typography style={{marginLeft:"auto",marginRight:"auto",marginTop:"2px", fontWeight:200, fontSize:12}}>
                  Have an account?
                </Typography>
                <Link to={URLS.login} className={classes.link}>
                <Typography align="center" style={{marginLeft:"auto",marginRight:"auto",marginTop:"0px", fontWeight:200, fontSize:12}}> 
                  Login
                </Typography>
                </Link>
                {
                  formPage===0?<>
                    <div style={{position:"absolute",bottom:"1%",right:"4%"}}>
                      <Switch
                        checked={isFaculty}
                        onChange={()=>setIsFaculty(!isFaculty)}
                      />
                      <p style={{margin:'0',padding:'0',fontSize:"0.65rem"}}>I'm a {isFaculty?"teacher":"student"}</p>
                    </div>
                  </>:null
                }
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    }
    </Grid>
  );
}
