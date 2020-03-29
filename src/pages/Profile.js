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
    useUser,
    useFirestoreCollectionData
} from 'reactfire';

import {
    useHistory
} from 'react-router-dom';

import firebase from 'firebase/app';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import {RowCreator, ColumnCreator, BlockCreator} from '../inc/PageCreator';

import userSchema from '../inc/userSchema';
import chatSchema from '../inc/chatSchema';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ChatIcon from '@material-ui/icons/Chat';

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
    const history = useHistory();

    const user = useUser(undefined, {
        startWithValue: {
            uid: 'QUARANCHILL'
        }
    });

    const docRef = useFirestore()
    .collection('users')
    .doc(user.uid);

    const docData = useFirestoreDocData(docRef, {
        startWithValue: userSchema
    });

    const initCheckLikes =  docData.likes.length > 10 ? (
        docData.likes.slice(0, 10)
    ) : docData.likes;

    // console.log(`Init Check Likes:\n${initCheckLikes}`);

    const [checkLikes, setCheckLikes] = useState(initCheckLikes);

    // console.log(`Check Likes:\n${checkLikes}`);


    const matchesColRef = useFirestore()
    .collection('users')
    .where('likes', 'array-contains-any', checkLikes);

    const matchesColData = useFirestoreCollectionData(matchesColRef, {
        startWithValue: [
            userSchema
        ]
    });

    const chatsColRef = useFirestore()
    .collection('chats')
    .where('users', 'array-contains', user.uid);

    const chatsColData = useFirestoreCollectionData(chatsColRef, {
        startWithvalue: [
            chatSchema
        ]
    })

    console.log(`CHATS:\n${JSON.stringify(chatsColData)}`);
    // console.log(`MATCHES:\n${JSON.stringify(matchesColData)}`);

    


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
            title="Profile Details"
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

    const handleChat = (match) => {
        // history.push(`/chat/${match.uid}`);

        let foundMatch = false;
        let foundChat;

        setLoading(true);

        chatsColData.forEach(chat => {
            console.log(`CURRENT CHAT:\n${JSON.stringify(chat)}`)

            chat.users.forEach(chatUser => {
                console.log(`CURRENT CHATUSER: ${chatUser}`)
                console.log(`MATCH ID: ${match.uid}`)
                if(chatUser === match.uid) {
                    console.log('chatuser===match.uid')
                    foundMatch = true;
                    foundChat = chat;
                    // return false;
                }
            })
            // if(foundMatch) {
            //     console.log('returning from found match true');
            //     return false;
            // }

            // if(chat.users[0] === user.uid || chat.users[1] === user.uid) {
            //     console.log('Found user!');
            //     foundUser = true;
            // }
            // if(chat.users[0] === user.uid || chat.users[1] === user.uid) {
            //     console.log('Found match!');
            //     foundMatch = true;
            // }
        })

        // If this chat is already created, then redirect to chat page
        if(foundMatch) {
            console.log('Found it!');
            console.log(`CHAT:\n${JSON.stringify(foundChat)}`);
            setLoading(false);
            history.push(`/chat/${foundChat.id}`)
        }
        else { // create new chat
            console.log('New chat!!');
            const chatDoc = {
                createdAt: new Date().toISOString(),
                id: `${match.uid}${user.uid}`,
                users: [match.uid, user.uid],
                displayNames: {
                    [match.uid]: match.displayName,
                    [user.uid]: user.displayName
                }
            }

            console.log(JSON.stringify(chatDoc));
            
            firebase.firestore().collection('chats').doc(chatDoc.id)
            .set(chatDoc)
            .then(() => {
                setLoading(false);
                history.push(`/chat/${chatDoc.id}`);
            })
            .catch(error => {
                setLoading(false);
            })
        }




        // firebase.firestore().collection('chats')
        // .where('users', 'array-contains', user.uid)
        // .get()
        // .then(querySnapshot => {
        //     if(querySnapshot.empty) {
        //         //CREATE NEW CHAT
        //         console.log('EMPTY')
        //     }
        //     else{
        //         querySnapshot.forEach((docSnapshot, index) => {
        //             if(docSnapshot.exists) {
        //                 console.log('Empty snapshot at index: ' + index);
        //             }
        //             else {
        //                 console.log(`DOC SNAPSHOT:\n${JSON.stringify(docSnapshot.data)}`)
        //             }
        //         })
        //     }
        // })
        // .catch(error => console.log(error))
    }

    const getMatches = () => {
        let listItemArr = [];

        matchesColData.forEach(match => {
            // console.log(match.uid)
            // console.log(user.uid);
            if(match.uid !== user.uid)
                listItemArr.push(
                    <ListItem
                        button={true}
                        onClick={() => handleChat(match)}
                        key={`key_${match.uid}`}
                    >
                        <ListItemText
                            primary={match.displayName}
                            secondary={`${match.age} years old. ${match.city}`}
                            className={classes.listItemText}
                        />


                        <ListItemIcon
                        >
                            <ChatIcon/>
                        </ListItemIcon>
                    </ListItem>
                );
        })

        return listItemArr;
    }

    const matchesBlock = (
        <>
            <BlockCreator
                title="Your matches"
            >
                <List>
                    {getMatches()}
                </List>
            </BlockCreator>
        </>
    )

    const mobileMarkup = (
        <RowCreator>
            <ColumnCreator
                ratio={12}
            >
                {profileBlock}
                {loading ? <CircularProgress/> : matchesBlock}
            </ColumnCreator>
        </RowCreator>
    )
    return (
        <>
            {mobileMarkup}
        </>
    )
}