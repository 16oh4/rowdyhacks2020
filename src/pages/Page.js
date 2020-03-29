import React from 'react';
import {makeStyles, createStyles} from '@material-ui/core/styles';
import {useDeviceScales, getScaledProperty} from '../inc/styleFunc';

import womanPhoneImage from '../images/womanPhone.jpg';

import {
    useLocation
} from 'react-router-dom';

const useStyles = makeStyles(({palette, styles}) => createStyles({
    ...styles,
    page: (props) => ({
        // backgroundColor: palette.background,
        // position: 'relative',
        minHeight: '100vh',
        minWidth: '100%',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        get backgroundImage() {
            switch(props.pageLocation) {
                case '/':
                    return `url(${womanPhoneImage})`
            }
        },
        backgroundSize: 'cover',
        backgroundPosition: '30% 0%',
        backgroundAttachment: 'fixed'
        // backgroundPosition: ''
        // paddingBottm: '20px'
    }),

}))

export default (props) => {
    const location = useLocation();
    const classes = useStyles({
        pageLocation: location.pathname
    });
    
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