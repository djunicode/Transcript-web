import { List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import ManSVG from '../assets/svg/man.svg';
import { ReactComponent as TranscriptSVG} from '../assets/svg/navbar_transcript.svg'
import { ReactComponent as SopSVG} from '../assets/svg/navbar_sop.svg'
import { ReactComponent as LorSVG} from '../assets/svg/navbar_lor.svg'
import { ReactComponent as GearSVG} from '../assets/svg/navbar_gear.svg'
import { Link } from 'react-router-dom';
// import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

const drawerWidth = 250;        //From figma
const navItems = {
    'Transcript': {
        'icon': <TranscriptSVG />,
        'items': [
            ["View all", "url to view all"], ["Upload marksheet", "url to upload marksheet"], ["Create new", "url to create new"]
        ],
        'clickUrl': false
    },
    'SOP': {
        'icon': <SopSVG />,
        'items': [
            ["Plagarism Checker", "url"]
        ],
        'clickUrl': false
    },
    'LOR': {
        'icon': <LorSVG />,
        'items': [
            ["View all", 'url'], ["Create new", "create new url"]
        ],
        'clickUrl': false
    },
    'Settings': {
        'icon': <GearSVG />,
        'items': [],
        'clickUrl': 'settings-url'
    }
}

const useStyles = makeStyles(theme=>({
        drawer: { flexShrink: 0 },
        drawerPaper: {
            width: drawerWidth, minHeight: '100vh', height: '100%',
            backgroundColor: theme.palette.primary.dark,
        },
        svgIcon: {
            display: 'block',
            margin: 'auto',
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2)
        },
        loggedInFont: {
            fontSize: 32,
            fontStyle: "normal",
            fontWeight: 200,
        },
        usernameFont: {
            fontSize: 36,
            fontStyle: "normal",
            fontWeight: 700,
        },
        container: {width: '100%', marginBottom: theme.spacing(1)},
        listRoot: {
            width: '100%',
            maxWidth: drawerWidth,
            backgroundColor: 'transparent',
        },
        listNested: {
            paddingLeft: theme.spacing(4),
        },
        navSvg: {
            paddingLeft: theme.spacing(2),
        },
        listHeadingFont: {
            fontSize: 24,
            fontStyle: "normal",
            fontWeight: 500,
        },
        listNestedText: {
            fontSize: 18,
            fontStyle: "normal",
            fontWeight: 300,
            marginLeft: theme.spacing(8)
        },
        nested: {
            height: 'fit-content',
            padding: 0
        },
        link: { 
            textDecoration: 'none', color: 'inherit'
        }
    })
)

function SideNav() {
    const classes = useStyles()
    // If xs, render drawer?
    
    return (
        <div className={classes.drawerPaper}>
            <Typography variant="h5" align="center">Transcript App</Typography>
            <img src={ManSVG} className={classes.svgIcon} height="100" width="fit-content" alt="Profile"/>
            <div className={classes.container}>
                <Typography align="center" className={classes.loggedInFont}>Logged Into</Typography>
                <Typography align="center" className={classes.usernameFont}>Username</Typography>
            </div>
            <List component="nav" className={classes.listRoot}>
                {
                Object.keys(navItems).map(
                    (key)=> {
                        const heading = <ListItem button={navItems[key]["clickUrl"]?true:false}>
                                            <ListItemIcon className={classes.navSvg}>{navItems[key]["icon"]}</ListItemIcon>
                                            <ListItemText> 
                                                <Typography className={classes.listHeadingFont}>{key}</Typography>
                                            </ListItemText>
                                        </ListItem>
                        return <div key={key}>
                        {
                        navItems[key]["clickUrl"]?
                        <Link className={classes.link} to={navItems[key]["clickUrl"]}>
                            {heading}    
                        </Link>
                        :
                        heading
                        }
                        <List component="div" disablePadding>
                        {
                            navItems[key]["items"].map(
                                (item, idx)=>(
                                    <Link key={idx} to={item[1]} className={classes.link}>
                                        <ListItem button className={classes.nested}>
                                                <ListItemText>
                                                    <Typography className={classes.listNestedText}>{item[0]}</Typography>
                                                </ListItemText>
                                        </ListItem>
                                    </Link>
                                )
                            )
                        }
                        </List>
                        </div>
                    }
                )
                }                
            </List>
        </div>
    )
}

export default SideNav
