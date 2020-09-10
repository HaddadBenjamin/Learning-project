import React, { useLayoutEffect, useRef} from "react";
import { Box } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

interface Props
{
    username : string
}

const useStyles = makeStyles(theme => ({
    title: {
        textAlign : 'center',
        verticalAlign : 'center',
        color : 'white',
        width : '120px',
        margin : 'auto',
        height : '20px',
        paddingBottom : '20px',
        backgroundColor : '#f50057',
        fontWeight : 'bold',
        fontSize : '15px',
        borderRadius : '4px',
        position : 'absolute'
    },
    video :{
        marginTop : '24px'
    }
}))

const ChatUserVideo = React.memo<Props>(({ username } : Props ) =>
{
    const classes = useStyles();
    const videoRef = useRef(null);

    useLayoutEffect(() => {
        navigator.getUserMedia({video: true, audio: false }, (stream) =>
        {
            (videoRef.current as any).srcObject = stream;
        }, (e) => console.log(e));
    });

    return (
        <>
            <Box borderColor="secondary.main" ml={1} >
                <h5 className={classes.title}>{username}</h5>
                <video autoPlay width="120" ref={videoRef} className={classes.video}/>
            </Box>
        </>
    );
})

export default ChatUserVideo;