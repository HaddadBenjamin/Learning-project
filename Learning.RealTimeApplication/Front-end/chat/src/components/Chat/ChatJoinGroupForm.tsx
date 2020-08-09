import React, {ChangeEvent, useState} from "react";
import {HubConnection } from "@microsoft/signalr"
import {Button, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

interface Props
{
    hubConnection : HubConnection,
    onSetGroupTitle(groupTitle : string) : void,
    onSetUserIsInGeneralChat(userIsInGeneralChat : boolean) : void,
    username : string
}

const useStyles = makeStyles((theme) => ({
    groupForm : {
        marginTop : '10px'
    },
    groupTitle : {
        width : '50%'
    },
    joinGroupButton : {
        width : '20%',
        marginLeft : '10px',
        height : '52px',
    },
    joinGeneralChannelButton : {
        float : 'right',
        width : '25.3%',
        height : '52px',
        marginLeft : '10px',
    }
}));

const ChatJoinGroupForm = ({ hubConnection, onSetGroupTitle, onSetUserIsInGeneralChat, username } : Props) =>
{
    const classes = useStyles();
    const [groupTitle, setGroupTitle] = useState<string>('');

    function onChangeGroupTitle(event : ChangeEvent<HTMLInputElement>) : void { setGroupTitle(event.target.value); }

    function joinGroup()
    {
        hubConnection.invoke('UserJoinRoom', username, groupTitle);

        onSetGroupTitle(groupTitle);
        onSetUserIsInGeneralChat(false);
    }

    function joinGeneralChannel()
    {
        hubConnection.invoke('UseLeaveRoom', username, groupTitle);

        onSetUserIsInGeneralChat(true);
    }
    return (
            <div className={classes.groupForm}>
                <TextField
                    id="outlined-textarea"
                    label="Room name"
                    placeholder="Room name"
                    variant="outlined"
                    value={groupTitle}
                    onChange={onChangeGroupTitle}
                    className={classes.groupTitle}
                />
                <Button variant="contained" color="secondary" className={classes.joinGroupButton} onClick={joinGroup}>
                    Join room
                </Button>

                <Button variant="contained" color="secondary" className={classes.joinGeneralChannelButton} onClick={joinGeneralChannel}>
                    Join General
                </Button>
        </div>
    )
}

export default ChatJoinGroupForm;