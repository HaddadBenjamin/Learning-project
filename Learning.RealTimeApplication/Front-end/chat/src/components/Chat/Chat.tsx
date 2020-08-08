import React, {
    ChangeEvent,
    useEffect,
    useState
} from "react";

import {
    TextField,
    Container,
    Typography,
    CssBaseline,
    Button,
    ListItem,
    List,
    ListItemText,
    Avatar,
    ListItemAvatar, Divider
} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    username : {
        width : '20%'
    },
    message : {
        width : '67%',
        marginLeft : '5px'
    },
    sendMessageButton : {
        marginLeft : '10px',
        height : '52px',
        float : 'right'
    },
    messagesList :
    {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

interface IMessage
{
   username : string,
   message : string
}

const Chat = () =>
{
    const classes = useStyles();

    {/* Send a message broadcoast*/}
    const [message, setMessage] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    function onChangeMessage(event : ChangeEvent<HTMLInputElement>) : void  { setMessage(event.target.value);  }
    function onChangeUsername(event : ChangeEvent<HTMLInputElement>) : void { setUsername(event.target.value); }

    {/* List messages */}
    const [messages, setMessages] = useState<IMessage[]>([
        {
            username : 'Alex',
            message : ' I\'ll be in your neighborhood doing errands this…'
        },
        {
            username : 'Thomas',
            message : ' Wish I could come, but I\'m out of town this…'
        },
        {
            username : 'Casandra',
            message : 'Do you have Paris recommendations? Have you ever…'
        },
    ]);
    const messagesComponent = messages.map(m => {
        const imagePath = `/static/images/avatar/${Math.floor(Math.random() * Math.floor(3)) + 1}.jpg`
        return (<>
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={imagePath} />
            </ListItemAvatar>
            <ListItemText
                primary={m.username}
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                        </Typography>
                        {m.message}
                    </React.Fragment>
                }
            />
        </ListItem>
        <Divider variant="inset" component="li" />
        </>)
    });

    return (
        <div>
            <React.Fragment>
                <CssBaseline />
                <Container fixed>
                    {/* Send a message broadcoast*/}
                    <br/>
                    <TextField
                        id="outlined-textarea"
                        label="Username"
                        placeholder="Username"
                        variant="outlined"
                        value={username}
                        onChange={onChangeUsername}
                        className={classes.username}
                    />
                    <TextField
                        id="outlined-textarea"
                        label="Message"
                        placeholder="Message"
                        multiline
                        variant="outlined"
                        value={message}
                        onChange={onChangeMessage}
                        className={classes.message}
                    />
                    <Button variant="contained" color="secondary" className={classes.sendMessageButton}>
                        Send message
                    </Button>

                    {/* List messages */}
                    <br/>
                    <br/>
                    <List className={classes.messagesList}>
                        {messagesComponent}
                    </List>
                </Container>
            </React.Fragment>
        </div>
    )
};

export default Chat;