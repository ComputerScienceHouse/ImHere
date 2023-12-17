import React, { useEffect, useState } from 'react'
import UserInfo from '../UserInfo'
import './UsersBox.tsx.scss'
import { rtcApiUrl, startConnection } from '../Connection'
import { Event } from '../pages/Attendance'


interface Props {
    users: UserInfo[],
    host: UserInfo,
    setUsers: React.Dispatch<React.SetStateAction<UserInfo[]>>,
    event: Event,
    setQrReady: React.Dispatch<React.SetStateAction<boolean>>,
    setErrMsg: React.Dispatch<React.SetStateAction<string>>
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

const UsersBox: React.FC<Props> = ({ users, setUsers, event, setErrMsg, setQrReady, host }) => {
    const [rtcConnected, setRtcConnected] = useState(false)

    useEffect(() => {
        startConnection(event, (member) => {
            console.log(`Member ${member.preferred_username} joined`)
            setUsers(users => [...users, member])
        })
            .then(() => {
                setRtcConnected(true)
            })
            .catch(err => {
                console.error(`Failed to start signalR connection: ${err.message}`)
                setErrMsg(`Failed to start signalR connection on ${rtcApiUrl}: ${err.message}`)
                setQrReady(false)
            })
    }, [event, setErrMsg, setQrReady, setUsers])
    return (
        <> {rtcConnected ?
            <div className='usersbox-container'>
                {users.map((userInfo, key) => <UserBox userInfo={userInfo} key={key} />)}
            </div> :
            <div>Connecting to signalR hub on {rtcApiUrl}...</div>
        }
        </>
    )
}

export default UsersBox