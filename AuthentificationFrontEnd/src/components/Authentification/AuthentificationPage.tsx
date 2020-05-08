import React, {
    ChangeEvent,
    useEffect,
    useState
} from "react";
import {IGlobalState} from "../../reducers";
import {useSelector} from "react-redux";
import { toast } from 'react-toastify';
import {
    login,
    logout,
    signIn
} from "../../actions/authentification.action";

const NotificationFirstPage = () =>
{
    const isAuthentified = useSelector<IGlobalState, boolean>(state => state.authentification.isAuthentified);
    const errorMessage = useSelector<IGlobalState, string | undefined>(state => state.authentification.errorMessage);
    const usernameFromGlobalState = useSelector<IGlobalState, string | undefined>(state => state.authentification.username);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() =>
    {
        if (errorMessage !== undefined)
            toast.error(errorMessage);
    }, [errorMessage]);


    function onChangeUsername(event: ChangeEvent<HTMLInputElement>) : void
    {
        setUsername(event.target.value);
    }

    function onChangePassword(event: ChangeEvent<HTMLInputElement>) : void
    {
        setPassword(event.target.value);
    }

    function onLoginClick() : void
    {
        login(username, password);
    }

    function onSignInClick() : void
    {
        signIn(username, password);
    }

    function onLogoutClick() : void
    {
        logout();
    }

    return (<>
            {isAuthentified ? (
                <>
                    <button onClick={onSignInClick}>Sign In</button>
                    <button onClick={onLoginClick}>Log In</button>
                    <button disabled={true}>Log In with Google</button>
                    <button disabled={true}>Log In with Facebook</button>
                    <button disabled={true}>Log In with Microsoft</button>

                    <input value={username} onChange={onChangeUsername} type="text" placeholder="Enter your username"/>
                    <input value={password} onChange={onChangePassword} type="text" placeholder="Enter your password"/>
+                </>
                ) :
                (
                    <>
                        Hi {{usernameFromGlobalState}} !
                        <button onClick={onLogoutClick}>Log out</button>
                    </>
                )}
        </>
    );
}