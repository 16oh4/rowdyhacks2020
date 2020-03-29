import React from 'react';

import {RowCreator, ColumnCreator, BlockCreator} from '../inc/PageCreator';

const useStyles = makeStyles(({styles, palette}) => createStyles({
    ...styles
}));

export default (props) => {

    const classes = useStyles();

    const profileBlock = (
        <BlockCreator>
            <form
                name="profile_form"
                autoComplete="off"
                noValidate
            >
                <Grid
                    container
                >
                    <Grid
                        
                    ></Grid>
                </Grid>
            </form>
        </BlockCreator>
    )

    const matchesBlock = (

    )

    const mobileMarkup = (
        <RowCreator>
            <ColumnCreator
                ratio={12}
            >
            
            </ColumnCreator>
        </RowCreator>
    )
    return (
        <>
            {mobileMarkup}
        </>
    )
}