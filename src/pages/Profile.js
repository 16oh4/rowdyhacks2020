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
import { Button } from '@material-ui/core';

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

    useEffect(() => {
        setState({
            displayName: docData.displayName,
            city: docData.city,
            age: docData.age,
            description: docData.description
        })
    }, [docData])


    const handleSubmit = () => {
        
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
                        <Typography>
                            Your display name
                        </Typography>
                        <TextField
                            name="displayName"
                            value={docData.displayName}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <Typography>
                            Your age
                        </Typography>
                        <TextField
                            name="age"
                            value={docData.age}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <Typography>
                            Your description
                        </Typography>
                        <TextField
                            name="description"
                            value={docData.description}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <Typography>
                            Your city
                        </Typography>
                        <TextField
                            name="city"
                            value={docData.city}
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
                                false
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