import {makeStyles} from "@material-ui/core/styles";
import React, {useEffect, useState} from "react";
import {IMessage} from "./Models/IMessage";
import {List} from "@material-ui/core";
import ChatMessage from "./ChatMessage";
import {HubConnection} from "@microsoft/signalr"
import MessageDestination from "./Models/MessageDestination";

const useStyles = makeStyles((theme) => ({
    messagesList :
    {
        width: '100%',
        marginTop : '5px'
    }
}));

interface Props
{
    hubConnection : HubConnection,
    getGroupTitle() : string
}

const ChatMessageList = ({ hubConnection, getGroupTitle } : Props) =>
{
    const classes = useStyles();
    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        hubConnection.on('SendMessageToAllUsers', (username: string, message: string) => {
            const newMessage: IMessage = { username: username, message: message, destination : MessageDestination.General };
            setMessages([...messages, newMessage]);
        });

        hubConnection.on('SendRoomMessage', (username: string, groupName : string, message: string) => {
            if (getGroupTitle() === groupName) {
                const newMessage: IMessage = { username: username, message: message, destination : MessageDestination.Room };
                setMessages([...messages, newMessage]);
            }
        });

        hubConnection.on('SendPrivateMessage', (username: string, message: string) => {
            const newMessage: IMessage = { username: username, message: message, destination : MessageDestination.Private };
            setMessages([...messages, newMessage]);
        });
    });

    return (<>
        <List className={classes.messagesList}>
            {messages.map(m => { return (<ChatMessage message={m} key={m.message}/>); })}
        </List>
    </>)
}

export default ChatMessageList;