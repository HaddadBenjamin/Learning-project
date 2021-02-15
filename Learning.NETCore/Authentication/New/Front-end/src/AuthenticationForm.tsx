import React, { useRef, useState } from 'react';
import axios from "axios";

const apiUrl = "https://localhost:44326";
const signInEndpoint = `${apiUrl}/authentication/signin`;
const logiEndpoint = `${apiUrl}/authentication/login`;
const logoutEndpoint = `${apiUrl}/authentication/logout`;
const refreshtTokenEndpoint = `${apiUrl}/authentication/refreshtoken`;
const revokeRefreshTokenEndpoint = `${apiUrl}/authentication/revokerefreshtoken`;
const getPostsEndpoints = `${apiUrl}/post/`;
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
        fetch(refreshtTokenEndpoint,
        {
          method: 'post',
          headers:  defaultHeaders,
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
            await getPosts();
        }
    }

    async function getPosts() : Promise<any>
    {
        var tokenHasExpired = false;
        
        await axios(
          {
            method: 'GET',
            url: getPostsEndpoints,
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
              <button onClick={onClickGetPosts}>Get posts</button>
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