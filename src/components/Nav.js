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

import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({palette, styles}) => createStyles({
    ...styles,
    toolBar: {
        flexDirection: 'center'
    },
    appBar: {
        backgroundColor: palette.primary.main,
        flexDirection: 'center'
    }
}));

export default () => {
    const classes = useStyles();

    return(
        <AppBar
            className={classes.appBar}
        >
            <Toolbar
                className={classes.toolBar}
            >
                <IconButton>
                    <AccountIcon/>
                </IconButton>
                <IconButton>
                    <MessageIcon/>
                </IconButton>
                <IconButton>
                    <AssignmentIcon/>
                </IconButton>
                <IconButton>
                    <PersonAddIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}