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

const initialMessages = [
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
];

interface Props
{
    hubConnection : HubConnection
}

const ChatMessageList = ({ hubConnection} : Props) =>
{
    const classes = useStyles();
    const [messages, setMessages] = useState<IMessage[]>(initialMessages);

    useEffect(() => {
        hubConnection.on('Broadcast', (username: string, message: string) => {
            const newMessage: IMessage =
                {
                    username: username,
                    message: message
                };
            setMessages([...messages, newMessage]);
        })
    });

    return (<>
        <List className={classes.messagesList}>
            {messages.map(m => { return (<ChatMessage message={m} key={m.message}/>); })}
        </List>
    </>)
}

export default ChatMessageList;