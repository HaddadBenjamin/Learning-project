import React, {ChangeEvent, useState} from "react";
import {HubConnection } from "@microsoft/signalr"
import {Button, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

interface Props
{
    hubConnection : HubConnection,
    onSetGroupTitle(groupTitle : string) : void,
    onSetUserIsInGeneralChat(userIsInGeneralChat : boolean) : void
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

const ChatJoinGroupForm = ({ hubConnection, onSetGroupTitle, onSetUserIsInGeneralChat } : Props) =>
{
    const classes = useStyles();
    const [groupTitle, setGroupTitle] = useState<string>('');

    function onChangeGroupTitle(event : ChangeEvent<HTMLInputElement>) : void { setGroupTitle(event.target.value);    }
    return (
            <div className={classes.groupForm}>
                <TextField
                    id="outlined-textarea"
                    label="Group name"
                    placeholder="Group name"
                    variant="outlined"
                    value={groupTitle}
                    onChange={onChangeGroupTitle}
                    className={classes.groupTitle}
                />
                {/* Join group behaviour / join general channel */}
                <Button variant="contained" color="secondary" className={classes.joinGroupButton}>
                    Join group
                </Button>

                <Button variant="contained" color="secondary" className={classes.joinGeneralChannelButton}>
                    Join General
                </Button>
        </div>
    )
}

export default ChatJoinGroupForm;