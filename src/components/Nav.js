import React from 'react';

import {
    useHistory
} from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import AccountIcon from '@material-ui/icons/AccountCircle';
import MessageIcon from '@material-ui/icons/Message';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import HomeIcon from '@material-ui/icons/Home';

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

export default () => {
    const classes = useStyles();
    const history = useHistory();

    return(
        <AppBar
            className={classes.appBar}
            position="sticky"
        >
            <Toolbar
                className={classes.toolBar}
            >
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

            </Toolbar>
        </AppBar>
    )
}