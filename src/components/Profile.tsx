import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown
} from 'reactstrap'

import React from 'react'
import { useOidc, useOidcAccessToken, useOidcIdToken } from '@axa-fr/react-oidc'
import UserInfo from '../UserInfo'

const Profile: React.FunctionComponent = () => {
    const { login, logout, isAuthenticated } = useOidc()
    const { idToken, idTokenPayload } = useOidcIdToken()
    const { accessTokenPayload } = useOidcAccessToken()
    const userInfo = accessTokenPayload as UserInfo

    if (!userInfo) return null

    return (
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret className="navbar-user">
                <img
                    className="rounded-circle"
                    src={`https://profiles.csh.rit.edu/image/${userInfo.preferred_username}`}
                    alt=""
                    aria-hidden={true}
                    width={32}
                    height={32}
                />
                ({userInfo.preferred_username})
                <span className="caret" />
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem>Dashboard</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => logout(null)}>Logout</DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}

export default Profile