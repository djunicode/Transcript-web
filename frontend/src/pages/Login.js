import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';

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
    
  }
}));

export default function LoginPage() {
  const [state, setState] = React.useState({
    checkedA: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const classes = useStyles();
  const matches = useMediaQuery('(min-width:700px)');
  return (
    // Main
    <Grid
      container
      className={classes.root}
      justify="center"
      alignItems="center"
    >
      {/* Left Half */}
      {matches?
        <Grid
        container
        item
        xs={4}
        className={classes.left}
        justify="center"
        alignItems="center"
      >
        <Grid item ></Grid>
        <Grid item className={classes.leftLanding} item sm={5}>
          <Typography variant="h5" style={{height:"30%",width:'80%'}}>
            <Box fontWeight={700}>
            Hello there teacher
            </Box>
            </Typography>
          <Typography variant="h4" style={{height:"30%",width:'80%'}}>
          <Box fontWeight={700}>
            Welcome Back
          </Box>
            </Typography>
        </Grid>
        <Grid item ></Grid>
      </Grid>:
      <></>   
    }
      
      {/* Right Half */}
      {matches?<Grid
        container
        item
        xs={4}
        className={classes.right}
        justify="center"
        alignItems="center"
        style={{position:"relative"}}
      >
        <Grid xs={6}>
          <Typography variant="h6" style={{marginBottom:"7%",marginTop:"10%"}}>
            <Box fontWeight={700}>
            LOG IN
            </Box>
            </Typography>
          <Typography variant='caption'>
            <Box fontWeight={500}>
            USERNAME 
            </Box>        
          </Typography>
          
          <InputBase
            label="USER NAME"
            fullWidth
            margin="normal"
            className={classes.inputBase}
          />
          <Typography variant="caption">
            <Box fontWeight={500}>
            PASSWORD
            </Box>
            </Typography>
          <InputBase
            label="USER NAME"
            fullWidth
            margin="normal"
            className={classes.inputBase}
          />

        
          <div style={{display:"flex",justifyContent:"center",marginTop:"14%"}}>
          <div style={{display:'flex',flexDirection:"column",marginLeft:"auto",marginRight:"auto"}}>
              <Button variant="contained" color="primary" style={{objectFit:"contain",maxHeight:"25%"}}>
                Login
              </Button>
              <Typography style={{marginLeft:"auto",marginRight:"auto",marginTop:"2px"}}>
                <Box fontWeight={200} fontSize={12}>
                New Here?
                </Box>
              </Typography>
              <Button variant="contained" color="primary" style={{objectFit:"contain"}}>
                Create an account
              </Button>
              <div style={{position:"absolute",bottom:"1%",right:"2%"}}>
              <Switch
              
              checked={state.checkedA}
              onChange={handleChange}
              name="checkedA"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            <p style={{margin:'0',padding:'0',fontSize:"0.7rem"}}>I'm a teacher</p>
            </div>
              </div>
            </div>
        </Grid>
      </Grid>
      :
      // Mobile web view
      <Grid container style={{background:"linear-gradient(to right,#255093,pink)"}}>
      <Grid container item xs={1}></Grid>
      <Grid
        container
        item
        xs={10}
        // className={classes.right}
        justify="center"
        style={{
            backgroundColor: "#212020",
            color: "white",
            minHeight:"105vh",
            borderRadius: "1rem",
            boxShadow: "0px 0px 39px 10px rgba(255,255,255,0.09) ",
            margin:"5% 0 5% 0",
            position:"relative"
        }}
      >
        <Grid item xs={10} style={{marginTop:"30%"}}>
        <Typography style={{fontSize:"1.2rem",lineHeight:"1.4rem"}} >
          <Box fontWeight={700}>
          Hello there teacher
          </Box>
          </Typography>
          <Typography style={{fontSize:"2.1rem"}} >
          <Box fontWeight={700}>
          Welcome Back
          </Box>
          </Typography>
          <div style={{display:'flex', alignItems:"start", flexDirection:"column",marginTop:"25%",minHeight:"300px",maxHeight:"500px"}}>
          <Typography >
            <Box fontWeight={500} fontSize="0.8rem">
            USERNAME 
            </Box>  
          </Typography>
          
          <InputBase
            label="USER NAME"
            fullWidth
            margin="normal"
            className={classes.appInputBase}
            style={{marginBottom:"10%"}}
          />
          <Typography>
            <Box fontWeight={500} fontSize="0.8rem">
              PASSWORD
            </Box>
          </Typography>
          <InputBase
            label="USER NAME"
            fullWidth
            margin="normal"
            className={classes.appInputBase}
            
          />
          <div style={{display:'flex',flexDirection:"column",marginLeft:"auto",marginRight:"auto",minHeight:"12rem",marginTop:"40%"}}>
              <Button variant="contained" color="primary" style={{height:"20%"}}>
                Login
              </Button>
              <Typography style={{marginLeft:"auto",marginRight:"auto"}} >
                New Here?
              </Typography>
              <Button variant="contained" color="primary">
                Create an account
              </Button>
              <div style={{position:"absolute",bottom:"1%",right:"4%"}}>
              <Switch
              
              checked={state.checkedA}
              onChange={handleChange}
              name="checkedA"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            <p style={{margin:'0',padding:'0',fontSize:"0.65rem"}}>I'm a teacher</p>
            </div>
          </div>
          </div>

          
        </Grid>
      </Grid>
      <Grid container item xs={1}></Grid>
      </Grid>
      }
      
    </Grid>
  );
}
