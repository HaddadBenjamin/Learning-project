import React, {
    ChangeEvent,
    useEffect,
    useState
} from "react";

import {
    TextField,
    Container,
    Typography,
    CssBaseline,
    Button,
    ListItem,
    List,
    ListItemText,
    Avatar,
    ListItemAvatar, Divider
} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    username : {
        width : '20%'
    },
    message : {
        width : '67%',
        marginLeft : '5px'
    },
    sendMessageButton : {
        marginLeft : '10px',
        height : '52px',
        float : 'right'
    },
    listMessageItem :
    {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));
const Chat = () =>
{
    {/* Send a message broadcoast*/}
    const [message, setMessage] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    function onChangeMessage(event : ChangeEvent<HTMLInputElement>) : void  { setMessage(event.target.value);  }
    function onChangeUsername(event : ChangeEvent<HTMLInputElement>) : void { setUsername(event.target.value); }

    {/* List messages */}
    const classes = useStyles();

    return (
        <div>
            <React.Fragment>
                <CssBaseline />
                <Container fixed>
                    {/* Send a message broadcoast*/}
                    <br/>
                    <TextField
                        id="outlined-textarea"
                        label="Username"
                        placeholder="Username"
                        variant="outlined"
                        value={username}
                        onChange={onChangeUsername}
                        className={classes.username}
                    />
                    <TextField
                        id="outlined-textarea"
                        label="Message"
                        placeholder="Message"
                        multiline
                        variant="outlined"
                        value={message}
                        onChange={onChangeMessage}
                        className={classes.message}
                    />
                    <Button variant="contained" color="secondary" className={classes.sendMessageButton}>
                        Send message
                    </Button>

                    {/* List messages */}
                    <br/>
                    <br/>
                    <List className={classes.listMessageItem}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Brunch this weekend?"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            Ali Connors
                                        </Typography>
                                        {" — I'll be in your neighborhood doing errands this…"}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Summer BBQ"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            to Scott, Alex, Jennifer
                                        </Typography>
                                        {" — Wish I could come, but I'm out of town this…"}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Oui Oui"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            Sandra Adams
                                        </Typography>
                                        {' — Do you have Paris recommendations? Have you ever…'}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </List>
                </Container>
            </React.Fragment>
        </div>
    )
};

export default Chat;