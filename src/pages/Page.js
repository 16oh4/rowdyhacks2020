import React from 'react';
import {makeStyles, createStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(({palette, styles}) => createStyles({
    ...styles,
    page: {
        // backgroundColor: palette.background,
        // position: 'relative',
        minHeight: '100vh',
        minWidth: '100%',
        padding: '15px',
        // paddingBottm: '20px'
    }
}))

export default (props) => {
    const classes = useStyles();
    return (
        <>
            <div
                className={classes.page}
            >
                {props.children}
            </div>
            
        </>
    )
}