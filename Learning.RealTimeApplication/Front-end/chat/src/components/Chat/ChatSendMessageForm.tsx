import React, {ChangeEvent, useState} from "react";
import {Button, TextField} from "@material-ui/core";
import {HubConnection } from "@microsoft/signalr"
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    username : {
        width : '25%'
    },
    message : {
        width : '45%',
        marginLeft : '10px'
    },
    sendMessageButton : {
        height : '52px',
        width : '25.3%',
        float : 'right'
    },

    toUsername : {
        marginTop : '10px',
        width : '25%'
    },
    privateMessage : {
        marginTop : '10px',
        width : '45%',
        marginLeft : '10px'
    },
    sendPrivateMessageButton: {
        marginTop : '10px',
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
    const sendMessageTitle = userIsInGeneralChat === true ? 'send message' : 'send message to room';
    const [message, setMessage] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [privateMessage, setPrivateMessage] = useState<string>('');
    const [toUsername, setToUsername] = useState<string>('');

    function onChangeMessage(event : ChangeEvent<HTMLInputElement>) : void  { setMessage(event.target.value);  }
    function onChangeUsername(event : ChangeEvent<HTMLInputElement>) : void { setUsername(event.target.value); }
    function onChangePrivateMessage(event : ChangeEvent<HTMLInputElement>) : void  { setPrivateMessage(event.target.value);  }
    function onChangeToUsername(event : ChangeEvent<HTMLInputElement>) : void { setToUsername(event.target.value); }

    function sendMessage()
    {
        if (userIsInGeneralChat)
            hubConnection.invoke('SendMessageToAllUsers', username, message);
        else
            hubConnection.invoke('SendRoomMessage', username, groupTitle, message);

        onSetUsername(username);
    }

    function sendPrivateMessage()
    {
        hubConnection.invoke('SendPrivateMessage', username, toUsername, message);
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
            {sendMessageTitle}
        </Button>

        <TextField
            id="outlined-textarea"
            label="To Username"
            placeholder="To Username"
            variant="outlined"
            value={toUsername}
            onChange={onChangeToUsername}
            className={classes.toUsername}
        />
        <TextField
            id="outlined-textarea"
            label="Private Message"
            placeholder="Private Message"
            multiline
            variant="outlined"
            value={privateMessage}
            onChange={onChangePrivateMessage}
            className={classes.privateMessage}
        />
        <Button variant="contained" color="secondary" className={classes.sendPrivateMessageButton} onClick={sendPrivateMessage}>
            Send private message
        </Button>
    </>)
}

export default ChatSendMessageForm;