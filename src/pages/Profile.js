import React, {
    useState,
    useEffect
} from 'react';

import {
    createStyles,
    makeStyles
} from '@material-ui/core/styles';

import {
    useFirestoreDocData,
    useFirestore,
    useUser
} from 'reactfire';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import {RowCreator, ColumnCreator, BlockCreator} from '../inc/PageCreator';

import userSchema from '../inc/userSchema';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import swal2 from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const reactSwal = withReactContent(swal2);

const useStyles = makeStyles(({styles, palette}) => createStyles({
    ...styles,
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

export default (props) => {

    const classes = useStyles();

    const user = useUser(undefined, {
        startWithValue: {
            uid: 'QUARANCHILL'
        }
    });

    const docRef = useFirestore().collection('users').doc(user.uid);

    const docData = useFirestoreDocData(docRef, {
        startWithValue: userSchema
    });

    const [state, setState] = useState({
        displayName: docData.displayName,
        city: docData.city,
        age: docData.age,
        description: docData.description
    })

    const [errors, setErrors] = useState({
        displayName: null,
        city: null,
        age: null,
        description: null
    })

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setState({
            displayName: docData.displayName,
            city: docData.city,
            age: docData.age,
            description: docData.description
        })
    }, [docData])


    const handleSubmit = () => {
        docRef.update({
            displayName: state.displayName,
            city: state.city,
            age: Number(state.age),
            description: state.description
        })
        .then(() => {
            reactSwal.fire({
                html: (
                    <Typography
                        className={classes.typography}
                    >
                        Your profile has been updated!
                    </Typography>
                )
            })
        })
        .catch(() => {
            reactSwal.fire({
                html: (
                    <Typography
                        className={classes.typography}
                    >
                        Ooops! Some error ocurred. Please try again
                    </Typography>
                )
            })
        })
    }

    const displayNameRegex = /^[a-zA-Z ]+$/;
    const ageRegex = /^[0-9]+$/;
    const descriptionRegex = /^[a-zA-Z 0-9]+$/;
    const cityRegex = /^[a-zA-Z ]+$/;

    const handleChange = (e) => {
        const {value, name} = e.target;
        const errors = {

        }

        switch(name) {
            case 'displayName':
                if(!value.match(displayNameRegex) || value.length < 1) {
                    errors.displayName = 'Please enter letters and spaces';
                }
                else errors.displayName = null;
                break;
            case 'age':
                if(!value.match(ageRegex) || value.length < 1) {
                    errors.age = 'Please enter a valid number.';
                }
                else errors.age = null;
                break;
            case 'city':
                if(!value.match(cityRegex) || value.length < 1) {
                    errors.city = 'Please enter a letters and spaces only.';
                }
                else errors.city = null;
                break;
            case 'description':
                if(!value.match(descriptionRegex) || value.length < 1) {
                    errors.description = 'Please enter letters, numbers, and spaces only.';
                }
                else errors.description = null;
                break;
            default:
                break;
        }

        setState( prevState => ({
            ...prevState,
            [name]: value
        }))

        setErrors(prevErrors => ({
            ...prevErrors,
            ...errors
        }))
    }

    const profileBlock = (
        <BlockCreator
            classes={classes}
        >
            {/* <form
                name="profile_form"
                autoComplete="off"
                noValidate
            > */}
                <Grid
                    container
                    direction="column"
                    justify="space-evenly"
                    alignItems="center"
                    spacing={3}
                >
                    <Grid
                        item
                        xs={12}
                    >
                        <Typography
                            className={classes.typography}
                        >
                            Your display name
                        </Typography>
                        <TextField
                            name="displayName"
                            value={state.displayName}
                            helperText={errors.displayName}
                            className={classes.textField}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <Typography
                            className={classes.typography}
                        >
                            Your age
                        </Typography>
                        <TextField
                            name="age"
                            value={state.age}
                            helperText={errors.age}
                            className={classes.textField}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <Typography
                            className={classes.typography}
                        >
                            Your description
                        </Typography>
                        <TextField
                            name="description"
                            value={state.description}
                            helperText={errors.description}
                            className={classes.textField}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <Typography
                            className={classes.typography}
                        >
                            Your city
                        </Typography>
                        <TextField
                            name="city"
                            value={state.city}
                            helperText={errors.city}
                            className={classes.textField}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <Button
                            onClick={handleSubmit}
                            className={classes.button}
                            disabled={
                                errors.displayName ||
                                errors.age ||
                                errors.description ||
                                errors.city
                            }
                        >
                            <Typography
                                className={classes.typographyButton}
                            >
                                Change
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            {/* </form> */}
        </BlockCreator>
    )

    const matchesBlock = (
        <>

        </>
    )

    const mobileMarkup = (
        <RowCreator>
            <ColumnCreator
                ratio={12}
            >
                {profileBlock}
            </ColumnCreator>
        </RowCreator>
    )
    return (
        <>
            {mobileMarkup}
        </>
    )
}