import {makeStyles} from "@material-ui/core/styles";
import React, {useState, useEffect} from "react";
import {IMessage} from "./IMessage";
import {List} from "@material-ui/core";
import ChatMessage from "./ChatMessage";
import {HubConnection } from "@microsoft/signalr"

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
        hubConnection.on('Broadcast', (username: string, message: string) => {
            const newMessage: IMessage = { username: username, message: message };
            setMessages([...messages, newMessage]);
        });

        hubConnection.on('SendRoomMessage', (username: string, groupName : string, message: string) => {
            if (getGroupTitle() === groupName) {
                const newMessage: IMessage = { username: username, message: message };
                setMessages([...messages, newMessage]);
            }
        });
    });

    return (<>
        <List className={classes.messagesList}>
            {messages.map(m => { return (<ChatMessage message={m} key={m.message}/>); })}
        </List>
    </>)
}

export default ChatMessageList;