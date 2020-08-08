import React from "react";
import {IMessage} from "./IMessage";
import {Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    inline: {
        display: 'inline',
    },
}));


interface Props
{
    message : IMessage
}

const ChatMessage = ({ message } : Props) =>
{
    const classes = useStyles();
    const imagePath = `/static/images/avatar/${Math.floor(Math.random() * Math.floor(3)) + 1}.jpg`

    return (
        <>
        <ListItem alignItems="flex-start" >
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={imagePath} />
            </ListItemAvatar>
            <ListItemText
                primary={message.username}
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                        </Typography>
                        {message.message}
                    </React.Fragment>
                }
            />
        </ListItem>
        <Divider variant="inset" component="li"/>
        </>
    )
}

export default ChatMessage;