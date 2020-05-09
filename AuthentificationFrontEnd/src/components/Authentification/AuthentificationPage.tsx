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
import {toast} from 'react-toastify';
import {
    facebookLogin,
    googleLogin,
    login,
    logout,
    signIn
} from "../../actions/authentification.action";
import {
    GoogleLogin,
    GoogleLogout
} from 'react-google-login';
import config from '../../shared/helpers/config';
import {LoggedWith} from "../../models/authentification.model";
import FacebookLogin from 'react-facebook-login';

const AuthentificationFirstPage = () =>
{
    const isAuthentified = useSelector<IGlobalState, boolean>(state => state.authentification.isAuthentified);
    const errorMessage = useSelector<IGlobalState, string | undefined>(state => state.authentification.errorMessage);
    const loggedWith = useSelector<IGlobalState, LoggedWith>(state => state.authentification.loggedWith);
    const usernameFromGlobalState = useSelector<IGlobalState, string | undefined>(state => state.authentification.username);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [profileImageUrl, setProfileImageUrl] = useState<string>('');
    const dispatch = useDispatch();

    useEffect(() =>
    {
        if (errorMessage !== 'undefined')
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

    function onClickGoogleLogin(response : any)
    {
        //dispatch(googleLogin(response.tokenId))
    }

    function onClickFacebookLogin(response : any)
    {
        dispatch(facebookLogin(response.name, response.email));
        console.log(response);
        setProfileImageUrl(response.picture.data.url);
    }

    function onClickGoogleLogout()
    {
        dispatch(logout())
    }

    function onClickFacebookLogout()
    {
        dispatch(logout())
    }

    function renderLogoutButton()
    {
        switch (loggedWith)
        {
            case LoggedWith.TheApplication :
                return <button onClick={onClickLogout}>Log out</button>;

            case LoggedWith.Google :
                return <GoogleLogout
                    clientId={config.googleClientId}
                    buttonText="Logout"
                    onLogoutSuccess={onClickGoogleLogout}
                />;

            case LoggedWith.Facebook:
                return <>
                    <img alt="profile-image" src={profileImageUrl}/> <br/>
                    <button onClick={onClickFacebookLogout}>Log out with Facebook</button>
                </>;

            default : return <></>
        }
    }

    function renderPage()
    {
        if (isAuthentified)
            return <>
                Hi {usernameFromGlobalState} !<br/>
                You logged with {loggedWith}<br/>
                {renderLogoutButton()}
            </>;

        return <>
            <button onClick={onClickSignIn}>Sign In</button>
            <button onClick={onClickLogin}>Login</button>
            <GoogleLogin
                clientId={config.googleClientId}
                buttonText="Login"
                onSuccess={onClickGoogleLogin}
                onFailure={onClickGoogleLogin}
            />
            <FacebookLogin
                appId={config.facebookAppId}
                autoLoad={false}
                icon="fa-facebook"
                scope="user_friends"
                fields="name,email,picture"
                reAuthenticate={false}
                callback={onClickFacebookLogin} />

            <input value={username} onChange={onChangeUsername} type="text" placeholder="Enter your username"/>
            <input value={password} onChange={onChangePassword} type="text" placeholder="Enter your password"/>
        </>
    }

    return (<>
            {renderPage()}
        </>
    );
}

export default AuthentificationFirstPage