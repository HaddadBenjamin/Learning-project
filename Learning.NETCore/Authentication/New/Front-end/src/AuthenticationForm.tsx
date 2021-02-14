import React, { useRef, useState } from 'react';

// Problèmes
// - Quand il y a une erreur, le set state est quand même appelé et il n'y a pas d'erreurs

const apiUrl = "https://localhost:44326";
const signInEndpoint = `${apiUrl}/identity/signin`;
const logiEndpoint = `${apiUrl}/identity/login`;
const logoutEndpoint = `${apiUrl}/identity/logout`;
const refreshtTokenEndpoint = `${apiUrl}/identity/refreshtoken`;
const revokeRefreshTokenEndpoint = `${apiUrl}/identity/revokerefreshtoken`;

const AuthenticationForm = () =>
{
    const [isConnected, setIsConnected] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const emailRef : any = useRef(null);
    const passwordRef : any = useRef(null);

    function onClickSignIn()
    {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        fetch(signInEndpoint, {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ Email : email, Password : password }),
        })
        .then(response =>
        {
            if (response.ok) return response.json();
            else throw new Error('Something went wrong');
        })
        .then(data =>
        {
          setAccessToken(data.AccessToken);
          setRefreshToken(data.RefreshToken);
          setIsConnected(true);
        }).catch(function(error) { console.log(JSON.stringify(error)); });
    }
    function onClickLogin()
    { 
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        fetch(logiEndpoint, {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ Email : email, Password : password }),
        })
        .then(response =>
        {
            if (response.ok) return response.json();
            else throw new Error('Something went wrong');
        })
        .then(data =>
        {
          setAccessToken(data.AccessToken);
          setRefreshToken(data.RefreshToken);
          setIsConnected(true);
        }).catch(function(error) { console.log(JSON.stringify(error)); });
    }
    function onClickLogout()
    {
        fetch(logoutEndpoint, {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ AccessToken : accessToken, RefreshToken : refreshToken }),
        })
        .then(response => setIsConnected(false))
        .catch(function(error) { console.log(JSON.stringify(error)); });
    }
    function onRefreshToken()
    {
        fetch(refreshtTokenEndpoint, {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ AccessToken : accessToken, RefreshToken : refreshToken }),
        })
        .then(response =>
        {
            if (response.ok) return response.json();
            else throw new Error('Something went wrong');
        })
        .then(data =>
        {
          setAccessToken(data.AccessToken);
          setRefreshToken(data.RefreshToken);
        })
        .catch(function(error) { console.log(JSON.stringify(error)); });
    }
    function onClickRevokeRefreshToken()
    { 
        fetch(revokeRefreshTokenEndpoint, {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ AccessToken : accessToken, RefreshToken : refreshToken }),
        })
        .then(response => setIsConnected(false))
        .catch(function(error) { console.log(JSON.stringify(error)); });
    }

    function renderPage()
    {
      if (!isConnected)
          return <>
              <input ref={emailRef} type="text" placeholder="Email address" />
              <input ref={passwordRef}  type="text" placeholder="Password"/>
              <button onClick={onClickSignIn}>Sign In</button>
              <button onClick={onClickLogin}>Login</button>
          </>;
      else
          return <>
              <p>You're connected</p>
              <button onClick={onClickLogout}>Logout</button>
              <button onClick={onClickRevokeRefreshToken}>Revoke refresh token</button>
          </>
    }
    return (
        <>
            {renderPage()}
        </>);
}

export default AuthenticationForm;