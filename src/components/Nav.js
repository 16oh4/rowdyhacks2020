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
//Core utils
import AccountIcon from '@material-ui/icons/AccountCircle';
import MessageIcon from '@material-ui/icons/Message';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
//Style

//Crap

import { fade, makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
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
    console.log(`Logged in: ${loggedIn}`);


    const handleSignout = () => {
        firebase.auth().signOut()
        .then(() => {
            history.push('/');
        })
        .catch(error => {
            console.log(error);
        })
    }


    let authIcons = (
        <>
            <IconButton
                onClick={() => history.push('/chat')}
            >
                <MessageIcon/>
            </IconButton>

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
            <IconButton
                onClick={() => history.push('/')}
            >
                <HomeIcon/>
            </IconButton>

            <IconButton
                onClick={() => history.push('/signup')}
            >
                <AssignmentIcon/>
            </IconButton>
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
  
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = ( // Handles mobile user
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      > 
        <MenuItem> 
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={0} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );



    return(
        <AppBar
            className={classes.appBar}
            position="sticky"
        >
            <Toolbar
                className={classes.toolBar}
            >
                
                { loggedIn ? authIcons : newIcons }
                <img style={{widht:150,height:100}} src={logo} alt='alternate'/>
            </Toolbar>
        </AppBar>
    )
}