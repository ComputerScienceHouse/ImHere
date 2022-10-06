import { useOidcAccessToken, useOidc, useOidcIdToken } from '@axa-fr/react-oidc'
import React from 'react'
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
      <h1>Home</h1>
      <p>Hello {userInfo.name}!</p>
      <button className='btn btn-primary'
        onClick={() => {
          logout(null)
        }}>Logout</button>
      {/* Ok so basically post logout redirect uris are not working.
            My workaround for now is forcing the logout EP in a new window and refreshing the page.
            Ok this isnt possible atm. For now it just sends a user to the sso page and thats that.
            After some digging I found that it may be an issue with post_logout_redirect_uri only allowing https and not http.
            Ill ask @rtp later to help me out (again) with configing https on the funny little openid thingy.
        */}
      <p>SID: {userInfo.sid}</p>
      <p>Token: {idToken}</p>
    </div>
  )
}

export default Home