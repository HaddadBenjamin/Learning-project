import React, {useState} from "react";
import {Box } from "@material-ui/core";
import ChatUserVideo from "./ChatUserVideo";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    title :
    {
        textAlign : 'center',
    }
}));

/* Devrait-être dans le global state */
const ChatUsersVideos = () =>
{
    const classes = useStyles();
    const [usernames, setUsernames] = useState<string[]>(['Ben', 'Jess', 'Thomas']);

    return (
        <>
            <Box flexDirection="row" flexWrap="wrap" display="flex" ml={1} mr={1} mt={3}>
                {usernames.map(u => { return (<ChatUserVideo username={u} key={u}/>); })}
            </Box>
        </>
    );
};

export default ChatUsersVideos;