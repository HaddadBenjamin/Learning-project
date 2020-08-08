import React, {ChangeEvent, useState} from "react";
import {Button, TextField} from "@material-ui/core";
import {HubConnection } from "@microsoft/signalr"
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    username : {
        width : '20%'
    },
    message : {
        width : '50%',
        marginLeft : '10px'
    },
    sendMessageButton : {
        height : '52px',
        float : 'right'
    },
}));

interface Props
{
    hubConnection : HubConnection
}

const ChatSendMessageForm = ({hubConnection } : Props) =>
{
    const classes = useStyles();
    const [message, setMessage] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    function onChangeMessage(event : ChangeEvent<HTMLInputElement>) : void  { setMessage(event.target.value);  }
    function onChangeUsername(event : ChangeEvent<HTMLInputElement>) : void { setUsername(event.target.value); }

    function sendMessage() { hubConnection.invoke('Broadcast', username, message); }

    return (<>
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
        <Button variant="contained" color="secondary" className={classes.sendMessageButton} onClick={sendMessage}>
            Send message
        </Button>
    </>)
}

export default ChatSendMessageForm;