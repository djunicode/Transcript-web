import {React,useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';


const useStyles=makeStyles((theme) => ({
    header:{
        display:"flex",
        justifyContent:"start",
        fontFamily:'dosis',
        marginBottom:theme.spacing(3),
        fontSize:'2rem'
    },
    switch:{
        display:"flex",
        justifyContent:"start",
    },
    landingText:{
        display:"flex",
        justifyContent:"start",
        fontFamily:'dosis',
        fontSize:'1.1rem'
    },
    button:{
        marginTop:theme.spacing(28)
    }
    
}))



function GeneralSettings() {
    const classes = useStyles();
    const [state, setState] = useState({
        checkedA: true,
        
      });
    
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
    return (
        <div>
            <Typography className={classes.header}>
                <Box fontWeight={500}>
                    General Settings
                </Box>
                
            </Typography>
            <Typography className={classes.landingText}>
                <Box fontWeight={300}>
                    App theme
                </Box>
            </Typography>
            <div className={classes.switch}>
            <Switch
                checked={state.checkedA}
                onChange={handleChange}
                name="checkedA"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            </div>
            <Button variant="contained" color="primary" className={classes.button}>
                Save Changes
            </Button>
        </div>
    )
}

export default GeneralSettings
