import React, { useState } from 'react'
import UserInfo from '../UserInfo'
import './UsersBox.tsx.scss'

interface Props {
    users: UserInfo[]
}

interface UserBoxProps {
    userInfo: UserInfo
    key: number

}

const UserBox: React.FC<UserBoxProps> = ({ userInfo }) => {
    const [isHover, setIsHover] = useState(false)
    const getUserboxPfpStyle = (src: string): React.CSSProperties => {
        return {
            width: '40px',
            height: '40px',
            marginRight: '5px',
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            borderRadius: '50%',
        }
    }

    const banUser = () => {
        console.log(`Banning user ${userInfo.preferred_username}`)
    }

    return (
        <div className='userbox'
            onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            <div className='userbox-pfp' style={getUserboxPfpStyle(`https://profiles.csh.rit.edu/image/${userInfo.preferred_username}`)}
                onClick={() => banUser()}>
                <div className={isHover ? 'userbox-pfp_overlay-hover' : 'userbox-pfp_overlay-nohover'}>×</div>
            </div>
            <div className='userbox-uname'>
                {userInfo.preferred_username}
            </div>
        </div>
    )
}

const UsersBox: React.FC<Props> = ({ users }) => {
    return (
        <div className='usersbox-container'>
            {users.map((userInfo, key) => <UserBox userInfo={userInfo} key={key} />)}
        </div>
    )
}

export default UsersBox