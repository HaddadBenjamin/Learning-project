import React, {
    ChangeEvent,
    useEffect,
    useState
} from "react";

import {TextField, Container, Typography, CssBaseline, Button} from "@material-ui/core"
const Chat = () =>
{
    const [message, setMessage] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    function onChangeMessage(event : ChangeEvent<HTMLInputElement>) : void
    {
        setMessage(event.target.value);
    }

    function onChangeUsername(event : ChangeEvent<HTMLInputElement>) : void
    {
        setUsername(event.target.value);
    }

    return (
        <div>
            <React.Fragment>
                <CssBaseline />
                <Container fixed>
                    <br/>
                    <TextField
                        id="outlined-textarea"
                        label="Username"
                        placeholder="Username"
                        variant="outlined"
                        value={username}
                        onChange={onChangeUsername}
                        style={{'width' : '20%'}}
                    />
                    <TextField
                        id="outlined-textarea"
                        label="Message"
                        placeholder="Message"
                        multiline
                        variant="outlined"
                        value={message}
                        onChange={onChangeMessage}
                        style={{width : '60%', marginLeft : '5px'}}
                    />
                    <Button variant="contained" color="secondary" style={{marginLeft : '10px', height : '52px'}}>
                        Send message
                    </Button>
                </Container>
            </React.Fragment>
        </div>
    )
};

export default Chat;