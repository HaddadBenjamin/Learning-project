import React, { useRef, useState } from 'react';
import axios from "axios";

const authenticationApiUrl = "https://localhost:44326";
const signInEndpoint = `${authenticationApiUrl}/authentication/signin`;
const logiEndpoint = `${authenticationApiUrl}/authentication/login`;
const logoutEndpoint = `${authenticationApiUrl}/authentication/logout`;
const refreshTokenEndpoint = `${authenticationApiUrl}/authentication/refreshtoken`;
const revokeRefreshTokenEndpoint = `${authenticationApiUrl}/authentication/revokerefreshtoken`;
const getMyUserEndpoint = `${authenticationApiUrl}/user/me`;
const getPostEndpoint = `${authenticationApiUrl}/post`;
const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

const AuthenticationForm = () =>
{
    const [isConnected, setIsConnected] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const emailRef : any = useRef(null);
    const passwordRef : any = useRef(null);
    const [posts, setPosts] = useState(null);
    const [myUser, setMyUser] = useState(null);

    function onClickSignIn()
    {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        fetch(signInEndpoint,
        {
          method: 'post',
          headers: defaultHeaders,
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

        fetch(logiEndpoint,
        {
          method: 'post',
          headers: defaultHeaders,
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
        fetch(logoutEndpoint,
        {
          method: 'post',
          headers: 
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${accessToken}`
          },
          body: JSON.stringify({ AccessToken : accessToken, RefreshToken : refreshToken }),
        })
        .then(response => setIsConnected(false))
        .catch(function(error) { console.log(JSON.stringify(error)); });
    }
    async function callRefreshToken()
    {
      await axios(
        {
          method: 'POST',
          url: refreshTokenEndpoint,
          headers: defaultHeaders,
          data: JSON.stringify({ AccessToken : accessToken, RefreshToken : refreshToken }),
        })
        .then(response =>
        {
            setAccessToken(response.data.AccessToken);
            setRefreshToken(response.data.RefreshToken);
        },    error =>console.log(JSON.stringify(error)));
    }
    function onClickRevokeRefreshToken()
    { 
        fetch(revokeRefreshTokenEndpoint,
        {
          method: 'post',
          headers:  defaultHeaders,
          body: JSON.stringify({ AccessToken : accessToken, RefreshToken : refreshToken }),
        })
        .then(response => setIsConnected(false))
        .catch(function(error) { console.log(JSON.stringify(error)); });
    }
    // refresh token use example :
    async function onClickGetPosts()
    { 
        var tokenHasExpired = await getPosts();

        if (tokenHasExpired === true)
        {
            await callRefreshToken();
            // Pour une raison que j'ignore l'access token n'a pas eu le temps de se mettre à jour
            // avant d'appeler de nouveau getPosts() ce qui fait qu'il y a toujours une 401 avec un token expiré.
            await getPosts();
        }
    }

    async function getPosts() : Promise<any>
    {
        var tokenHasExpired = false;
        
        await axios(
          {
            method: 'GET',
            url: getPostEndpoint,
            headers:
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization' : `Bearer ${accessToken}`
            },
            data: {}
          })
          .then(response => setPosts(response.data), 
                error =>
                {
                    console.log(JSON.stringify(error));
                    
                    if (error.response.status === 401 && error.response.headers['token-expired'])
                        tokenHasExpired = true;

                    setPosts(null);
                });

          return tokenHasExpired;
    }
    async function onClickGetMyUser()
    { 
        var tokenHasExpired = await getMyUser();

        if (tokenHasExpired === true)
        {
            await callRefreshToken();
            // Pour une raison que j'ignore l'access token n'a pas eu le temps de se mettre à jour
            // avant d'appeler de nouveau getPosts() ce qui fait qu'il y a toujours une 401 avec un token expiré.
            await getMyUser();
        }
    }

    async function getMyUser() : Promise<any>
    {
        var tokenHasExpired = false;
        
        await axios(
        {
            method: 'GET',
            url: getMyUserEndpoint,
            headers:
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization' : `Bearer ${accessToken}`
            },
            data: {}
          })
          .then(response => setMyUser(response.data), 
                error =>
                {
                    console.log(JSON.stringify(error));
                    
                    if (error.response.status === 401 && error.response.headers['token-expired'])
                        tokenHasExpired = true;

                    setMyUser(null);
                });

          return tokenHasExpired;
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
                <button onClick={onClickGetMyUser}>Get my user</button>
                <button onClick={onClickGetPosts}>Get posts</button>
                <h2>My user :</h2>
                {myUser !== undefined && JSON.stringify(myUser)}
                <h2>The posts :</h2>
                {posts !== undefined && JSON.stringify(posts)}
            </>
    }
    return (
        <>
            {renderPage()}
        </>);
}

export default AuthenticationForm;