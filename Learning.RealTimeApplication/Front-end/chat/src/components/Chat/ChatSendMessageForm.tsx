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
        width : '25.3%',
        float : 'right'
    },
}));

interface Props
{
    hubConnection : HubConnection,
    onSetUsername(username : string) : void,
    groupTitle : string,
    userIsInGeneralChat : boolean
}

const ChatSendMessageForm = ({hubConnection, onSetUsername, groupTitle, userIsInGeneralChat} : Props) =>
{
    const classes = useStyles();
    const [message, setMessage] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    function onChangeMessage(event : ChangeEvent<HTMLInputElement>) : void  { setMessage(event.target.value);  }
    function onChangeUsername(event : ChangeEvent<HTMLInputElement>) : void { setUsername(event.target.value); }

    function sendMessage()
    {
        if (userIsInGeneralChat)
            hubConnection.invoke('Broadcast', username, message);
        else
            hubConnection.invoke('SendRoomMessage', username, groupTitle, message);

        onSetUsername(username);
    }

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