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
import ChatUsersVideos from "./ChatUsersVideos";

const Chat = () =>
{
    const [hubConnection] = useState<HubConnection>(new HubConnectionBuilder().withUrl("https://localhost:44391/chat").build()); // globlal state
    const [userIsInGeneralChat, setUserIsInGeneralChat] = useState<boolean>(true); // globlal state
    const [groupTitle, setGroupTitle] = useState<string>('');   // globlal state
    const [username, setUsername] = useState<string>('');       // globlal state

    useEffect(() => {
        hubConnection.start().then(() => console.log('connected to the hub')).catch((e) => alert(e))
    }, []);

    function onSetGroupTitle(groupTitle : string) : void { setGroupTitle(groupTitle); }
    function onSetUsername(username : string) : void { setUsername(username)}
    function getGroupTitle() : string { return groupTitle; }

    return (
        <div>
            <React.Fragment>
                <CssBaseline />
                <Container fixed>
                    {/* Tout ces composants ne devraient pas avoir de props et utilisé le global state */}
                    <ChatSendMessageForm
                        hubConnection={hubConnection}
                        onSetUsername={onSetUsername}
                        userIsInGeneralChat={userIsInGeneralChat}
                        groupTitle={groupTitle}/>
                    <ChatJoinGroupForm
                        hubConnection={hubConnection}
                        onSetGroupTitle={onSetGroupTitle}
                        onSetUserIsInGeneralChat={setUserIsInGeneralChat}
                        username={username}/>
                    <ChatUsersVideos/>
                    <ChatTitle userIsInGeneralChat={userIsInGeneralChat} groupTitle={groupTitle}/>
                    <ChatMessageList hubConnection={hubConnection} getGroupTitle={getGroupTitle} />
                </Container>
            </React.Fragment>
        </div>
    )
};

export default Chat;