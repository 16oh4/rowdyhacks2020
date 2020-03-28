import React from 'react';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import {BlockCreator, RowCreator, ColumnCreator} from '../inc/PageCreator';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(({styles, palette}) => ({
    ...styles,
}));

export default (props) => {
    const classes = useStyles();
    const [fields, setFields] = useState()
    return (
        <RowCreator>
            <ColumnCreator
                ratio={12}
            >
                <BlockCreator
                    classes={classes}
                >
                    <Typography
                        variant="h2"
                    >
                        Quaranchill
                    </Typography>
                    <TextField
                        value={value}
                    />
                </BlockCreator>
            </ColumnCreator>
        </RowCreator>
    )
}