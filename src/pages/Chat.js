import React, {
    useState
} from 'react';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import {RowCreator, ColumnCreator, BlockCreator} from '../inc/PageCreator';

import {
    useFirestoreDocData,
    useFirestore,
    useUser,
    useFirestoreCollectionData
} from 'reactfire';

import {
    useRouteMatch
} from 'react-router-dom';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import chatMessageSchema from '../inc/chatMessageSchema';

import {createStyles, makeStyles} from '@material-ui/core/styles';
import chatSchema from '../inc/chatSchema';
import userSchema from '../inc/userSchema';

import firebase from 'firebase/app';

const useStyles = makeStyles(({palette, styles}) => createStyles({
    ...styles,
    listItem: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    listItemTextRight: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

        '& .MuiTypography-root': {
            color: palette.primary.main,
            textAlign: 'right'
        }
    },
    listItemTextLeft: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

        '& .MuiTypography-root': {
            color: palette.primary.main,
            textAlign: 'left'
        }
    }
}))


export default (props) => {
    const match = useRouteMatch('/chat/:chatID');
    const classes = useStyles();
    const user = useUser(undefined, {
        startWithValue: {
            uid: 'QUARANCHILL'
        }
    });

    dayjs.extend(relativeTime);

    const chatID = match.params.chatID;

    const chatDocRef = useFirestore()
    .collection('chats')
    .doc(chatID);

    const chatDocData = useFirestoreDocData(chatDocRef, {
        startWithValue: chatSchema
    })

    const messageColRef = useFirestore()
    .collection('chats')
    .doc(chatID)
    .collection('messages');

    const messageColRefQuery = messageColRef
    .orderBy('createdAt', 'asc');
    

    const messageColData = useFirestoreCollectionData(messageColRefQuery, {
        startWithValue: [
            chatMessageSchema
        ]
    })

    // console.log(match.params.chatID);

    // console.log(JSON.stringify(messageColData));

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {

        const filterMatchUser = chatDocData.users.filter(user => {
            if(user === user.uid) return false;
            else return true;
        })

        const matchedUser = filterMatchUser[0];
        // console.log(`matched user: ${matchedUser}`);

        const messageData = {
            createdAt: new Date().toISOString(),
            sender: user.uid,
            receiver: matchedUser,
            senderDisplayName: user.displayName,
            message
        };

        // console.log(`chat message:\n${JSON.stringify(messageData)}`)

        setLoading(true);

        messageColRef.add(messageData)
        .then(docRef => {
            // console.log(`Wrote doc`);

            setLoading(false);
            setMessage('');
        })
        .catch(error => {
            setLoading(false);
            // console.log(error);
        })

        



    }

    const getMessages = () => {
        const messageItems = messageColData.map(message => {
            const userIsSender = message.sender === user.uid ? true : false;

            const senderDisplayName = chatDocData.displayNames[message.sender];

            let userSenderMarkup = (
                <ListItem
                    key={message.createdAt}
                    className={classes.listItem}
                >
                    <ListItemText
                        primary={message.message}
                        secondary={`${dayjs(message.createdAt).fromNow(true)} ago`}
                        className={classes.listItemTextLeft}
                        style={{
                            width: '80%'
                        }}
                    />
                    <ListItemText
                        primary={senderDisplayName}
                        style={{
                            width: '20%'
                        }}
                    />
                </ListItem>
            )

            let userReceiverMarkup = (
                <ListItem
                    key={message.createdAt}
                    className={classes.listItem}
                >
                    <ListItemText
                        primary={senderDisplayName}
                        style={{
                            width: '20%'
                        }}
                        // className={classes.listItemText}
                    />
                    <ListItemText
                        primary={message.message}
                        secondary={`${dayjs(message.createdAt).fromNow(true)} ago`}
                        className={classes.listItemTextRight}
                        style={{
                            width: '80%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end'
                        }}
                    />
                </ListItem>
            )

            return userIsSender ? userSenderMarkup : userReceiverMarkup;
        })

        return (
            <List>
                {messageItems}
            </List>
        )
    }

    return (
        <Container
            maxWidth="sm"
            disableGutters
        >
            <RowCreator>
                <ColumnCreator
                    ratio={12}
                >
                    <BlockCreator
                        title={`Chat`}
                    >
                        <div
                            style={{
                                maxHeight: '50vh',
                                overflowY: 'scroll',
                            }}
                        >
                            {getMessages()}
                        </div>
                    </BlockCreator>
                    <BlockCreator
                        // title="Chat"
                    >
                        <Grid
                            container
                            direction="row"
                            spacing={2}
                            justify="center"
                            alignItems="center"
                        >       
                            <Grid
                                item
                                xs={8}
                            >               
                                <TextField
                                    name="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className={classes.textField}
                                    style={{
                                        width: '100%'
                                    }}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}
                            >
                                <Button
                                    onClick={handleSubmit}
                                    className={classes.button}
                                    disabled={
                                        message.length < 1 ||
                                        loading
                                    }
                                >
                                    <Typography
                                        className={classes.typographyButton}
                                    >
                                        Send
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </BlockCreator>
                </ColumnCreator>
            </RowCreator>
        </Container>
    )
}