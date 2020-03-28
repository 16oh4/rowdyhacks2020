import React from 'react';

import {makeStyles, createStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles( ({styles}) => createStyles({
    ...styles
}))

export const ColumnCreator = (props) => {
    const {ratio, children} = props;

    return (
        // The column Wrapper
        <Grid
            item
            xs={12}
            sm={ratio}
        >
            {/* The styled column */}
            <Grid
                container
                direction="column"
                wrap='nowrap'
                spacing={2}
            >
                {children}
            </Grid>

        </Grid>
    )
}

// Only pass in classes when the return structure within this component matches the intended one

export const BlockCreator = (props) => {
    const {
        title, 
        subheader, 
        children, 
        actions, 
        // isMobile
    } = props;
    let passedClasses = props.classes;
    const classes = useStyles();

    // if classes prop isn't passed in, use the hook
    if(!passedClasses) return (
        <Grid
            item
            xs={12}
            sm={12}
        >
            <Card
                className={classes.card}
                // style={{
                //     padding: isMobile ? '4px' : '20px'
                // }}
            >
                <CardHeader
                    title={title}
                    subheader={subheader}
                    className={classes.typographyCardHeader}
                />
                <CardContent
                    className={classes.cardContent}
                >
                    {children}
                </CardContent>
                <CardActions
                    className={classes.cardActions}
                >
                    {actions}                    
                </CardActions>
            </Card>
        </Grid>
    )

    // else used the passed classes
    else return (
        <Grid
            item
            xs={12}
            sm={12}
        >
            <Card
                className={passedClasses.card}
            >
                <CardHeader
                    title={title}
                    subheader={subheader}
                    className={passedClasses.typographyCardHeader}
                />
                <CardContent
                    className={passedClasses.cardContent}
                >
                    {children}
                </CardContent>
                <CardActions
                    className={passedClasses.cardActions}
                >
                    {actions}                    
                </CardActions>
            </Card>
        </Grid>
    )
};

export const RowCreator = ({children, spacing}) => {
    return (
        <Grid
            container
            direction="row"
            spacing={spacing}
        >
            {children}
        </Grid>
    )
}

export const AlertCreator = (props) => {
    const {title, subTitle, subheader, message, children, classes} = props;
    return (
        <div
            className={classes.alertDiv}
        >
            {title && <Typography
                variant="h5"
                className={classes.alertTitle}
            >
                {title}
            </Typography>}

            { (subTitle || subheader) && <Typography
                variant="h5"
                className={classes.alertSubTitle}
            >
                {subTitle ? subTitle: subheader}
            </Typography>}

            {message && 
            <> 
                <br/>
                <Typography
                    className={classes.alertMsg}
                >
                    {message}
                </Typography> 
            </>}
            {children}
        </div>
    )
}