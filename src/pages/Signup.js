import React, {
    useState,
    useEffect,
    useRef
} from 'react';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { BlockCreator, RowCreator, ColumnCreator } from '../inc/PageCreator';
import { parsePhoneNumber, ParseError } from 'libphonenumber-js';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';
import swal2 from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';

const reactSwal = withReactContent(swal2);


const useStyles = makeStyles(({styles, palette}) => ({
    ...styles,
}));

export default (props) => {
    const classes = useStyles();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState(null);
    const [parsedPhoneNumber, setParsedPhoneNumber] = useState(null);

    const [activationCode, setActivationCode] = useState('');
    const [activationCodeError, setActivationCodeError] = useState(null);

    const [verificationID, setVerificationID] = useState(null);

    const [stage, setStage] = useState(0);

    const phoneRegex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

    const history = useHistory();
    const location = useLocation();

    // if(location.pathname);

    
    const handleSignup = (e) => {
        let alertHtml = (
            <Typography
                className={classes.typography}
            >
                This phone number is already registered!
            </Typography>
        );

        console.log('this is parsedPhoneNumber' + parsedPhoneNumber)
        axios.post('/checkPhoneNumber', {
            phoneNumber: parsedPhoneNumber
        })
        .then(res => {
            console.log('User can register');
            setStage(1);
        })
        .catch(error => {
            //TODO: handle user registered with alert
            reactSwal.fire({
                html: alertHtml
            })
            .then(result => {
                // user clicked ok
                if(result.value) {

                }
                // user clicked away or cancel
                else {

                }
            })
            .catch(error => {
                console.log(error);
            })
        })
    }

    let recaptchaVerifier;
    let phoneCredentialRef = useRef();

    const setupActivationCode = () => {
        recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptchaDiv', {
            'size': 'visible',
            'callback': (response) => {

            },
            'expired-callback': () => {

            }
        });

        const provider = new firebase.auth.PhoneAuthProvider();

        provider.verifyPhoneNumber(parsedPhoneNumber, recaptchaVerifier)
        .then(verificationId => {
            recaptchaVerifier.clear();
            setVerificationID(verificationId);

        })
        .catch(error => {
            console.log(error);
        })

    }

    const handleActivationCode = () => {
        let alertHtml = (
            <>
                <Typography
                    className={classes.typography}
                >
                    Successfully registered!
                    You will now be redirected.
                </Typography>
            </>
        );

        try {
            console.log(`Activation Code:\n${activationCode}`);
            console.log(`Verification Code:\n${verificationID}`);
            phoneCredentialRef.current = firebase.auth.PhoneAuthProvider.credential(verificationID, activationCode);

            firebase.auth().signInWithCredential(phoneCredentialRef.current)
            .then(userCredential => {
                reactSwal.fire({
                    html: alertHtml
                })
                .then(result => {
                    history.push('/match');
                })
                .catch(error => {
                    console.log(error);
                    history.push('/match');
                })
            })
            .catch(error => {
                console.log(error);
            })
        }
        catch(error) {
            setActivationCodeError('Some error occurred. Try again!');
            console.log(error);
        }
    }

    const handlePhoneNumber = (e) => {
        let phoneNumber = e.target.value;
        setPhoneNumber(phoneNumber);
        let parsePhoneNum;

        if(!phoneNumber.match(phoneRegex)) {
            setPhoneNumberError('Please enter a valid phone number.')
        }
        else {
            try {
                parsePhoneNum = parsePhoneNumber(phoneNumber, 'US').number;
                console.log(parsePhoneNum);
                setParsedPhoneNumber(parsePhoneNum);
                setPhoneNumberError(null);
            }
            catch (error) {
                console.log(error);
                setPhoneNumberError('Please enter a valid phone number.');
            }
        }


    }

    const activationCodeRegex = /^[0-9]{6}$/

    const handleActivationCodeField = (e) => {
        let code = e.target.value;

        setActivationCode(code);

        if(!code.match(activationCodeRegex)) {
            setActivationCodeError('Please enter a valid activation code.');
        }
        else {
            setActivationCodeError(null);
        }
    }

    useEffect(() => {
        switch(stage) {
            case 0:
                break;
            case 1:
                console.log('in stage 1');
                setupActivationCode();
                break;
            case 2:
                break;
            default:
                break;
        }
    }, [stage])

    let stageZero = (
        <>
            <Grid
                item
                xs={12}
            >
                <Typography
                    variant="body1"
                    className={classes.typography}
                >
                    Signup using a US phone number
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
                    helperText={phoneNumberError}
                    className={classes.textField}
                />
            </Grid>
            <Grid
                item
                xs={12}
            >
                <Button
                    onClick={handleSignup}
                    className={classes.button}
                    disabled={
                        !!phoneNumberError ||
                        phoneNumber.length < 1
                    }
                >
                    <Typography
                        className={classes.typographyButton}
                    >
                        Submit
                    </Typography>
                </Button>
            </Grid>
        </>
    );

    let stageOne = (
        <>
            <Grid
                item
                xs={12}
            >
                <Typography
                    className={classes.typography}
                >
                    Please do the recaptcha and enter the code sent to {parsedPhoneNumber}.
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                id="recaptchaDiv"
            >
            </Grid>
            <Grid
                item
                xs={12}
            >
                <TextField
                    name="activationCode"
                    value={activationCode}
                    required
                    variant="standard"
                    onChange={handleActivationCodeField}
                    helperText={activationCodeError}
                    className={classes.textField}
                />
            </Grid>
            <Grid
                item
                xs={12}
            >
                <Button
                    onClick={handleActivationCode}
                    className={classes.button}
                    disabled={
                        activationCode.length !== 6 ||
                        !!activationCodeError

                    }
                >
                    <Typography
                        className={classes.typographyButton}
                    >
                        Verify Phone
                    </Typography>
                </Button>
            </Grid>
        </>
    );

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
                        {stage === 0 && stageZero}
                        {stage === 1 && stageOne}
                    </Grid>
                </BlockCreator>
            </ColumnCreator>
        </RowCreator>
    )
}