import React, { useEffect, useState} from "react";
import {
    Container,
    CssBaseline,
} from "@material-ui/core"
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr"
import ChatSendMessageForm from "./ChatSendMessageForm";
import ChatMessageList from "./ChatMessageList";
import ChatTitle from "./ChatTitle";
import ChatJoinGroupForm from "./ChatJoinGroupForm";

const Chat = () =>
{
    const [hubConnection] = useState<HubConnection>(new HubConnectionBuilder().withUrl("https://localhost:44391/chat").build());
    const [userIsInGeneralChat, setUserIsInGeneralChat] = useState<boolean>(true);
    const [groupTitle, setGroupTitle] = useState<string>('');

    useEffect(() => {
        hubConnection.start().then(() => console.log('connected to the hub')).catch((e) => alert(e))
    }, []);
    function onSetGroupTitle(groupTitle : string) : void { setGroupTitle(groupTitle); }

    return (
        <div>
            <React.Fragment>
                <CssBaseline />
                <Container fixed>
                    <ChatSendMessageForm hubConnection={hubConnection}/>
                    <ChatJoinGroupForm hubConnection={hubConnection} onSetGroupTitle={onSetGroupTitle} onSetUserIsInGeneralChat={setUserIsInGeneralChat}/>
                    <ChatTitle userIsInGeneralChat={userIsInGeneralChat} groupTitle={groupTitle}/>
                    <ChatMessageList hubConnection={hubConnection}/>
                </Container>
            </React.Fragment>
        </div>
    )
};

export default Chat;