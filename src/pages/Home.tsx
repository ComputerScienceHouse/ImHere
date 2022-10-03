import { useOidcUser } from '@axa-fr/react-oidc';
import React from 'react'

const Home = () => {
    const{ oidcUser, oidcUserLoadingState } = useOidcUser();
    return (
    <div>
        <h1>Home</h1>
        <p>{JSON.stringify(oidcUser)}</p>   
    </div>
  )
}

export default Home