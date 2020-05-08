import React, {
    ChangeEvent,
    useEffect,
    useState
} from "react";
import {IGlobalState} from "../../reducers";
import {
    useDispatch,
    useSelector
} from "react-redux";
import { toast } from 'react-toastify';
import {
    login,
    logout,
    signIn
} from "../../actions/authentification.action";

const AuthentificationFirstPage = () =>
{
    const isAuthentified = useSelector<IGlobalState, boolean>(state => state.authentification.isAuthentified);
    const errorMessage = useSelector<IGlobalState, string | undefined>(state => state.authentification.errorMessage);
    const usernameFromGlobalState = useSelector<IGlobalState, string | undefined>(state => state.authentification.username);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useDispatch();

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

    function onClickLogin() : void
    {
        dispatch(login(username, password));
    }

    function onClickSignIn() : void
    {
        dispatch(signIn(username, password));
    }

    function onClickLogout() : void
    {
        dispatch(logout());
    }

    return (<>
            {!isAuthentified ? (
                <>
                    <button onClick={onClickSignIn}>Sign In</button>
                    <button onClick={onClickLogin}>Log In</button>
                    <button disabled={true}>Log In with Google</button>
                    <button disabled={true}>Log In with Facebook</button>
                    <button disabled={true}>Log In with Microsoft</button>

                    <input value={username} onChange={onChangeUsername} type="text" placeholder="Enter your username"/>
                    <input value={password} onChange={onChangePassword} type="text" placeholder="Enter your password"/>
                </>
                ) :
                (
                    <>
                        Hi {{usernameFromGlobalState}} !
                        <button onClick={onClickLogout}>Log out</button>
                    </>
                )}
        </>
    );
}

export default AuthentificationFirstPage