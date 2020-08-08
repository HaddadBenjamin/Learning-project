import React, { useEffect, useState} from "react";
import {
    Container,
    CssBaseline,
} from "@material-ui/core"
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr"
import ChatSendMessageForm from "./ChatSendMessageForm";
import ChatMessageList from "./ChatMessageList";
import ChatTitle from "./ChatTitle";

const Chat = () =>
{
    const [hubConnection] = useState<HubConnection>(new HubConnectionBuilder().withUrl("https://localhost:44391/chat").build());
    const [userIsInGeneralChat, setUserIsInGeneralChat] = useState<boolean>(true);
    const [groupTitle, setGroupTitle] = useState<string>('');

    useEffect(() => {
        hubConnection.start().then(() => console.log('connected to the hub')).catch((e) => alert(e))
    }, []);

    return (
        <div>
            <React.Fragment>
                <CssBaseline />
                <Container fixed>
                    <ChatSendMessageForm hubConnection={hubConnection}/>
                    <ChatTitle userIsInGeneralChat={userIsInGeneralChat} groupTitle={groupTitle}/>
                    {/* <ChatJoinGroupForm hubConnection={hubConnection} onSetGroupTitle={setGroupTitle()} onSetUserIsInGeneralChat={setUserIsInGeneralChat}/>
                    */}<ChatMessageList hubConnection={hubConnection}/>
                </Container>
            </React.Fragment>
        </div>
    )
};

export default Chat;