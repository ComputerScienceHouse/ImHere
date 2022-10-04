import { useOidcAccessToken, useOidc } from '@axa-fr/react-oidc'
import React from 'react'
import UserInfo from '../UserInfo'

const Home = () => {
    const { accessTokenPayload } = useOidcAccessToken();
    // casting oidcUser causes it to be null????
    const userInfo = accessTokenPayload as UserInfo

    const {login, logout, isAuthenticated} = useOidc()

    console.log(userInfo)
    return (
    <div>
        <h1>Home</h1>
        <p>Hello {userInfo.name}!</p>   
        <button onClick={() => logout()}>Logout</button>
    </div>
  )
}

export default Home