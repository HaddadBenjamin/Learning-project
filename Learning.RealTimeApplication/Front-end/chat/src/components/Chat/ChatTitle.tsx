import React from "react";
import {makeStyles} from "@material-ui/core/styles";

interface Props
{
    userIsInGeneralChat : boolean,
    groupTitle : string
}

const useStyles = makeStyles((theme) => ({
    chatTitle :
    {
        textAlign : 'center',
        marginTop : '40px',
        marginBottom : '0px'
    }
}));

const ChatTitle = ({ userIsInGeneralChat, groupTitle } : Props) =>
{
    const classes = useStyles();
    const title = userIsInGeneralChat ? "General chat" : `« ${groupTitle} » room`;

    return (
        <h1 className={classes.chatTitle}>{title}</h1>
    )
};

export default ChatTitle;