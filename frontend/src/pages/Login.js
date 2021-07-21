import React, { useState }from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Switch from '@material-ui/core/Switch';
import { fetchUserDataFail, fetchUserDataSuccess, loginFail, loginSuccess } from '../redux'
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { API_BASE, URLS } from "../consts";
import axios from "axios";
import { generateHeaders, ValidateEmail } from '../utils'
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
    [theme.breakpoints.down('sm')]:{
      borderRadius: "0 0 0 0"
    },
  },
  right: {
    backgroundColor: "#212020",
    color: "white",
    minHeight: "70vh",
    borderRadius: "0 1rem 1rem 0",
    boxShadow: "0px 0px 39px 10px rgba(255,255,255,0.09) ",
    [theme.breakpoints.down('sm')]:{
      borderRadius: "0 0 0 0"
    },
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
  link: {textDecoration: 'None', color: 'inherit'}
}));

export default function LoginPage() {
	const dispatch = useDispatch()
	const history = useHistory()
	const [isFaculty, setIsFaculty] = useState(false)
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [emailErr, setEmailErr] = useState(false)
	const classes = useStyles();
	const matches = useMediaQuery('(min-width:700px)');
	const handleSubmit = (e) => {
		e.preventDefault()
		setEmailErr(false)
		if(!ValidateEmail(username)) { setEmailErr(true); return }
		axios.post(`${API_BASE}/api/auth/login/`, { //attempt login
			email: username,
			password: password
		})
		.then(res => {
			dispatch(loginSuccess(res.data)); //login success
			axios.get(`${API_BASE}/api/auth/users/me/`, generateHeaders(localStorage.getItem('accessToken')))
			.then(res => {
				dispatch(fetchUserDataSuccess(res.data))
			})
			.catch(err=>dispatch(fetchUserDataFail()))
				history.push(URLS.home)
			})
		.catch(err=>{
			dispatch(loginFail()) //login fail
			if(err.response.status===401){
				//display invalid credentials on login
			}
		})
  }
  return (
    <Grid container className={classes.root} justify="center" alignItems="center">
      {matches?<>
        {/* LHS */}
        <Grid container item xs={12} md={4} className={classes.left} justify="center" alignItems="center">
          <Grid item className={classes.leftLanding} sm={5}>
            <Typography variant="h5" style={{height:"30%",width:'80%', fontWeight:700}}>
              Hello there
            </Typography>
            <Typography variant="h4" style={{height:"30%",width:'80%', fontWeight:700}}>
                Welcome Back
            </Typography>
          </Grid>
        </Grid>
        {/* RHS */}
        <Grid container item xs={12} md={4} className={classes.right} justify="center" alignItems="center" style={{position:"relative"}}>
          <Grid item xs={6}>
            <form>
              <Typography variant="h6" style={{marginBottom:"7%",marginTop:"10%", fontWeight:700}}>
                LOG IN
              </Typography>
              <Typography variant='caption' style={{fontWeight:500}}>
                USERNAME
              </Typography>
              <InputBase
                label="USERNAME"
                fullWidth
                value={username}
                error={emailErr}
                onChange={(e)=>setUsername(e.target.value)}
                className={classes.inputBase}
              />
              <Typography variant="caption" style={{fontWeight:500}}>
                PASSWORD
              </Typography>
              <InputBase
                label="PASSWORD"
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                fullWidth
                className={classes.inputBase}
              />


              <div style={{display:"flex",justifyContent:"center",marginTop:"14%"}}>
                <div style={{display:'flex',flexDirection:"column",marginLeft:"auto",marginRight:"auto"}}>
                  <Button onClick={handleSubmit} variant="contained" color="primary" style={{objectFit:"contain",maxHeight:"25%"}}>
                    Login
                  </Button>
                  <Typography style={{marginLeft:"auto",marginRight:"auto",marginTop:"2px", fontWeight:200, fontSize:12}}>
                    New Here?
                  </Typography>
                  <Button onClick={()=>history.push(URLS.signup)} variant="contained" color="primary" style={{objectFit:"contain"}}>
                    Create an account
                  </Button>
                </div>
              </div>
            </form>
          </Grid>
        </Grid>
        </>
        :
        // Mobile web view
        <Grid container style={{background:"linear-gradient(to right,#255093,pink)", minHeight:"100vh",}}>
          <Grid container item xs={10} justify="center"
            style={{
                backgroundColor: "#212020",
                color: "white",
                borderRadius: "1rem",
                boxShadow: "0px 0px 39px 10px rgba(255,255,255,0.09) ",
                margin:"5% 0 5% 0",
                position:"relative", marginLeft: "auto", marginRight:"auto"
            }}
          >
            <Grid item xs={10} style={{marginTop:"30%"}}>
              <Typography style={{fontSize:"1.2rem",lineHeight:"1.4rem", fontWeight:700}} >Hello there </Typography>
              <Typography style={{fontSize:"2.1rem", fontWeight:700}} >Welcome Back</Typography>
              <div style={{display:'flex', alignItems:"start", flexDirection:"column",marginTop:"25%",minHeight:"300px",maxHeight:"500px"}}>
                <form style={{width:'100%'}}>
                  <Typography style={{fontWeight:500, fontSize:"0.8rem"}}>USERNAME</Typography>
                  <InputBase
                    label="USERNAME"
                    fullWidth
                    className={classes.appInputBase}
                    value={username}
                    error={emailErr}
                    onChange={(e)=>setUsername(e.target.value)}
                    style={{marginBottom:"10%"}}
                  />
                  <Typography style={{fontWeight:500, fontSize:"0.8rem"}}>
                      PASSWORD
                  </Typography>
                  <InputBase
                    label="PASSWORD"
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className={classes.appInputBase}
                  />
                
                  <div style={{display:'flex',flexDirection:"column",marginLeft:"auto",marginRight:"auto",minHeight:"12rem",marginTop:"40%"}}>
                    <Button onClick={handleSubmit} variant="contained" color="primary" style={{height:"20%"}}>
                      Login
                    </Button>
                    <Typography style={{marginLeft:"auto",marginRight:"auto"}} >
                      New Here?
                    </Typography>
                    <Button onClick={()=>history.push(URLS.signup)} variant="contained" color="primary">
                      Create an account
                    </Button>
                  </div>
                </form>
              </div>
            </Grid>
          </Grid>
        </Grid>   
      }
    </Grid>
  );
}
