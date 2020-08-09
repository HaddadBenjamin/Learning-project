import React from "react";
import {IMessage} from "./Models/IMessage";
import {Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import MessageDestination from "./Models/MessageDestination";

const useStyles = makeStyles((theme) => ({
    privateMessage : {
        display: 'inline',
        color : '#f50057 !important'
    },
    roomMessage : {
        display: 'inline',
        color : '#8c9eff !important'
    },
    generalMessage : {
        display: 'inline',
        color : 'rgba(0, 0, 0, 0.54) !important'
    }
}));


interface Props
{
    message : IMessage
}

const ChatMessage = ({ message } : Props) =>
{
    const classes = useStyles();
    const imagePath = `/static/images/avatar/${Math.floor(Math.random() * Math.floor(3)) + 1}.jpg`
    const className =
        message.destination === MessageDestination.General ? classes.generalMessage :
        message.destination === MessageDestination.Room ? classes.roomMessage :
        message.destination === MessageDestination.Private ? classes.privateMessage :
        "";

    console.log(className);
    return (
        <>
        <ListItem alignItems="flex-start" >
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={imagePath} />
            </ListItemAvatar>
            <ListItemText
                primary={message.username}
                secondary={
                    <p className={className}>
                        {message.message}
                    </p>
                }
            />
        </ListItem>
        <Divider variant="inset" component="li"/>
        </>
    )
}

export default ChatMessage;