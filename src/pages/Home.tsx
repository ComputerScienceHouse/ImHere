import { useOidcAccessToken, useOidc, useOidcIdToken } from '@axa-fr/react-oidc'
import React from 'react'
import { Link } from 'react-router-dom'
import Authenticating from '../callbacks/Authenticating'
import AuthenticationError from '../callbacks/AuthenticationError'
import SessionLost from '../callbacks/SessionLost'
import UserInfo from '../UserInfo'

const Home = () => {
  const { accessTokenPayload } = useOidcAccessToken()
  const { idToken, idTokenPayload } = useOidcIdToken()
  // casting oidcUser causes it to be null????
  const userInfo = accessTokenPayload as UserInfo
  const { login, logout, isAuthenticated } = useOidc()

  //console.log(userInfo)
  //console.log(idToken)

  //const logoutExtras: any | undefined = {id_token_hint: idToken, post_logout_redirect_uri: 'https://localhost:3000' }
  return (
    <div>
      <h1 className="display-3">Hey! ImHere!</h1>
      <p className="lead">Get started by filling out a new attendance form or scanning a QR code.</p>
      <hr className="my-4" />
      <p className="lead">
        <Link className="btn btn-primary btn-lg" to="/attendance" role="button">Generate attendance QR code</Link>
      </p>
    </div>
  )
}

export default Home