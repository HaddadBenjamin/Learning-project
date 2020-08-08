import React, { useEffect, useState} from "react";
import {
    Container,
    CssBaseline,
} from "@material-ui/core"
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr"
import ChatSendMessageForm from "./ChatSendMessageForm";
import ChatMessageList from "./ChatMessageList";

const Chat = () =>
{
    const [hubConnection] = useState<HubConnection>(new HubConnectionBuilder().withUrl("https://localhost:44391/chat").build());

    useEffect(() => {
        hubConnection.start().then(() => console.log('connected to the hub')).catch((e) => alert(e))

    }, []);

    return (
        <div>
            <React.Fragment>
                <CssBaseline />
                <Container fixed>
                    <ChatSendMessageForm hubConnection={hubConnection}/>
                    <ChatMessageList hubConnection={hubConnection}/>
                </Container>
            </React.Fragment>
        </div>
    )
};

export default Chat;