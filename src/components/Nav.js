import React from 'react';

import {
    useHistory
} from 'react-router-dom';

import {
    useUser
} from 'reactfire';

import firebase from 'firebase/app';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import AccountIcon from '@material-ui/icons/AccountCircle';
import MessageIcon from '@material-ui/icons/Message';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({palette, styles}) => createStyles({
    ...styles,
    toolBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    appBar: {
        backgroundColor: palette.secondary.main,
    }
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

    return(
        <AppBar
            className={classes.appBar}
            position="sticky"
        >
            <Toolbar
                className={classes.toolBar}
            >
                { loggedIn ? authIcons : newIcons }
            </Toolbar>
        </AppBar>
    )
}