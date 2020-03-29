import React, {
    useState,
    useEffect,
    useRef
} from 'react';
// Default layouts
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { BlockCreator, RowCreator, ColumnCreator } from '../inc/PageCreator';
import { parsePhoneNumber, ParseError } from 'libphonenumber-js';

// Components / @material-ui
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
// API / DB
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/firestore';

// Images
import signInLogo from '../images/signinLogo.png';


import { useHistory } from 'react-router-dom';

import swal2 from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const reactSwal = withReactContent(swal2);


const useStyles = makeStyles(({styles, palette}) => ({
    ...styles,
    section: {
        padding: "70px 0",
        textAlign: "center"
      },
      title: {
        marginBottom: "1rem",
        marginTop: "30px",
        minHeight: "32px",
        textDecoration: "none"
      },
      description: {
        color: "#999"
      }
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

    const [firstTime, setFirstTime] = useState(null);

    const phoneRegex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

    const history = useHistory();
    const {loggedIn} = props;
    // console.log(`Logged in signup: ${loggedIn}`)

    console.log(`FIRST TIME:\n${firstTime}`);

    
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
            setFirstTime(true)
            console.log('first time' + firstTime);
        })
        .catch(error => {
            
            setStage(1);
            setFirstTime(false);
            console.log('first time' + firstTime);
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

    const handleActivationCode = async () => {
        let userCredential;
        let alertHtml = (
            <>
                <Typography
                    className={classes.typography}
                >
                    Logged in! You will now be redirected.
                </Typography>
            </>
        );

        try {
            console.log(`Activation Code:\n${activationCode}`);
            console.log(`Verification Code:\n${verificationID}`);
            phoneCredentialRef.current = firebase.auth.PhoneAuthProvider.credential(verificationID, activationCode);
        }
        catch(error) {
            setActivationCodeError('Some error occurred. Try again!');
            console.log(error);
        }

        try {
            userCredential = await firebase.auth().signInWithCredential(phoneCredentialRef.current)
        }
        catch (error) {
            console.log(error);
        }

        if(!firstTime) {
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
        } else if(firstTime) {
            const userData = {
                phoneNumber: parsedPhoneNumber,
                createdAt: new Date().toISOString(),
                likes: ['Red Dead Redemption 2'],
                displayName: '',
                age: 23,
                description: '',
                city: 'San Antonio', // Default city
                uid: userCredential.user.uid
            };
            
            firebase.firestore().collection('users').doc(userCredential.user.uid).set(userData)
            .then(() => {
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

    let stageZero = (/* Landing page prompt */
        <>

            <Grid
                item
                xs={12}
            >
                <Typography
                    variant="body1"
                    className={classes.typography}
                >
                    Enter with a US phone number
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

    let stageTwo = (
        <>
            <Grid
                item
                xs={12}
            >
                <Typography
                    className={classes.typography}
                >
                    You're logged in! Please proceed to the app.
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
            >
                <Button
                    onClick={() => history.push('/match')}
                    className={classes.button}
                >
                    <Typography
                        className={classes.typographyButton}
                    >
                        Enter!
                    </Typography>
                </Button>
            </Grid>
        </>
    )

    let bufferText = ( //Will house contents of lol 
        <div className={classes.section}>
            <Grid // Intro to layout
              container justify="center"
              spacing={2}
            >
              <Grid // First col
                item
                sm={6}  
              >
                <Typography
                    variant="h2"
                    className={classes.typography}
                >
                    [Image here]
                </Typography>
              </Grid>
            </Grid>

            <div>
            </div>
        </div>
    )

    return (
        <RowCreator>
            {/* <ColumnCreator>
                {bufferText}
            </ColumnCreator> */}
            <ColumnCreator
                ratio={12}
            >
                
                <BlockCreator
                    classes={classes}
                >
                    <Grid /* Container for all conent on sign in page*/
                        container
                        spacing={1}
                        className={classes.grid}
                    >
                        <img style={{widht:150,height:100}} src={signInLogo} alt='alternate'/>
                        
                        {loggedIn ? (
                            stageTwo
                        ): (
                            <>
                                {stage === 0 && stageZero}
                                {stage === 1 && stageOne}
                            </>
                        )}
                    

                    </Grid>
                </BlockCreator>
            </ColumnCreator>
            
        </RowCreator>
    )
}