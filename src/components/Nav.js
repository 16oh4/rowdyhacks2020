import React from 'react';

import {
    useHistory
} from 'react-router-dom';

import {
    useUser
} from 'reactfire';

import firebase from 'firebase/app';
//Main
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
//Core utils
import AccountIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
//Style + icons
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// Struff
import logo from '../images/logo.png';

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }));

export default (props) => {
    const classes = useStyles();
    const history = useHistory();

    const {loggedIn} = props;
    // console.log(`Logged in: ${loggedIn}`);


    const handleSignout = () => {
        firebase.auth().signOut()
        .then(() => {
            history.push('/');
        })
        .catch(error => {
            // console.log(error);
        })
    }


    let authIcons = (
        <>
            {/* <IconButton
                onClick={() => history.push('/chat')}
            >
                <MessageIcon/>
            </IconButton> */}
            <img style={{widht:150,height:100}} src={logo} alt='alternate'/>
            <IconButton
                onClick={() => history.push('/match')}
            >
                <PersonAddIcon/>
            </IconButton>

            <IconButton
                onClick={() => history.push('/profile')}
            >
                <AccountIcon/>
            </IconButton>

            <IconButton
                onClick={handleSignout}
            >
                <ExitToAppIcon/>
            </IconButton>
        </>
    )

    let newIcons = (
        <>
            {/* <IconButton
                onClick={() => history.push('/')}
            >
                <HomeIcon/>
            </IconButton>

            <IconButton
                onClick={() => history.push('/signup')}
            >
                <AssignmentIcon/>
            </IconButton> */}

            {/* <Button // Just the logo for now as a clickable
                onClick={() => history.push('/')}
            >
                <img style={{widht:150,height:100}} src={logo} alt='alternate'/>
            </Button> */}
            <img style={{width:150,height:100}} src={logo} alt='alternate'/>
        </>
    )

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
  
    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
  
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    return(
        <AppBar
            className={classes.appBar}
            position="sticky"
            style={{ background: 'transparent', boxShadow: 'none'}}
        >
            <Toolbar
                className={classes.toolBar}
            >
                { loggedIn ? authIcons : newIcons }
                
            </Toolbar>
        </AppBar>
    )
}