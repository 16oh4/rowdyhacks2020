import React, {
    useState,
    useEffect
} from 'react';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { BlockCreator, RowCreator, ColumnCreator } from '../inc/PageCreator';
import { parsePhoneNumber, ParseError } from 'libphonenumber-js';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(({styles, palette}) => ({
    ...styles,
}));

export default (props) => {
    const classes = useStyles();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const phoneRegex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

    const handleSignup = (e) => {

    }

    const handlePhoneNumber = (e) => {
        let phoneNumber = e.target.value;
        let parsedPhoneNumber;

        if(!phoneNumber.match(phoneRegex)) {
            setPhoneNumberError('Please enter a valid phone number.')
        }
        else {
            try {
                parsedPhoneNumber = parsePhoneNumber(phoneNumber, 'US').number;
                console.log(parsedPhoneNumber);
            }
            catch (error) {
                console.log(error);
                setPhoneNumberError('Please enter a valid phone number.');
            }
        }


    }

    return (
        <RowCreator>
            <ColumnCreator
                ratio={12}
            >
                <BlockCreator
                    classes={classes}
                >
                    <Grid
                        container
                        spacing={1}
                        className={classes.grid}
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            <Typography
                                variant="body1"
                                className={classes.typography}
                            >
                                Signup using your phone number
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <TextField
                                name="phoneNumber"
                                value={phoneNumber}
                                required
                                variant="standard"
                                onChange={handlePhoneNumber}
                                helperText="Phone #"
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <Button
                                onClick={handleSignup}
                                className={classes.button}
                            >
                                <Typography
                                    // className={classes.typography}
                                >
                                    Submit
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </BlockCreator>
            </ColumnCreator>
        </RowCreator>
    )
}