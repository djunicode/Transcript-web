import {React,useEffect,useState} from 'react'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import { FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme)=>({
    root:{
        marginTop:theme.spacing(1.5),
        fontFamily:"dosis",
        fontSize:"1.1rem"
    },
    header:{
        fontSize:'2rem'
    }
}))

function PersonalDetails() {
    const classes = useStyles();
    return (
        <div>
            <Typography className={classes.header}>
                <Box fontWeight={500}>
                Personal Details
                </Box>     
            </Typography>

            {/* form */}
            <FormControl fullWidth>
            {/* Branch */}
            <Typography className={classes.root}>
                <Box fontWeight={300}>
                Branch
                </Box>     
            </Typography>
            <TextField
            id="branch"
            fullWidth
            InputProps={{
                endAdornment:(
                    <InputAdornment position="end">
                        <CreateIcon/>
                    </InputAdornment>
                )
            }}
            >
            </TextField>

            {/* Full name */}
            <Typography className={classes.root}>
                <Box fontWeight={300}>
                Full Name
                </Box>     
            </Typography>
            <TextField
            id="fullname"           
            fullWidth
            InputProps={{
                endAdornment:(
                    <InputAdornment position="end">
                        <CreateIcon/>
                    </InputAdornment>
                )
            }}
            >
            </TextField>

            {/* sap id */}
            <Typography className={classes.root}>
                <Box fontWeight={300}>
                SAP ID
                </Box>     
            </Typography>
            <TextField
            id="sapid"            
            fullWidth
            InputProps={{
                endAdornment:(
                    <InputAdornment position="end">
                        <CreateIcon/>
                    </InputAdornment>
                )
            }}
            >
            </TextField>

            {/* gender */}
            <Typography className={classes.root}>
                <Box fontWeight={300}>
                Gender
                </Box>     
            </Typography>
            <TextField
            id="gender"            
            fullWidth
            InputProps={{
                endAdornment:(
                    <InputAdornment position="end">
                        <CreateIcon/>
                    </InputAdornment>
                )
            }}
            >
            </TextField>

            {/* email */}
            <Typography className={classes.root}>
                <Box fontWeight={300}>
                Email
                </Box>     
            </Typography>
            <TextField
            id="email"
            fullWidth
            InputProps={{
                endAdornment:(
                    <InputAdornment position="end">
                        <CreateIcon/>
                    </InputAdornment>
                )
            }}
            >
            </TextField>
            </FormControl>
        </div>
    )
}

export default PersonalDetails
