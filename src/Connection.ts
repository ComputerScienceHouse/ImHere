import * as signalr from '@microsoft/signalr'
import UserInfo from './UserInfo'
import { Event } from './pages/Attendance'

export const rtcApiUrl = 'https://localhost:7161/rtc/hub'

const connection = new signalr.HubConnectionBuilder()
    .withUrl(rtcApiUrl)
    .withAutomaticReconnect()
    .build()

/**
 * Start SignalR connection and register callbacks
 * @param events the array of event names and their callback functions
 */
export const startConnection = async (event: Event, memberSignedInCallback: (member: UserInfo) => void) => {
    const takeown = async () => {
        await connection.send('Takeown', event.ID, event.HostUID).catch(e => {
            console.error(`In connection.send('Takeown'): ${e}`)
            throw e
        })
    }

    if (connection.state !== signalr.HubConnectionState.Disconnected) {
        console.warn('SignalR connection is already started. Taking ownership and ignoring...')
        await takeown()
        return
    }

    console.info('Starting SignalR connection...')
    await connection.start().catch(e => {
        console.error(`In connection.start(): ${e}`)
        throw e
    })
    await takeown()
    connection.on('MemberSignedIn', (member, hostUID) => {
        console.log(`MemberSignedIn: ${member}`)
        if (hostUID === event.HostUID)
            memberSignedInCallback(JSON.parse(member) as UserInfo)
    })
}

/**
 * Send a message to the SignalR hub. This bans the member from the meeting
 * @param method the method to call on the hub
 * @param username 
 * @param message 
 * @returns 
 */
export const sendDeleteUser = async (attendanceID: number, username: string) =>
    await connection.invoke('MemberDelete', attendanceID, username)

/**
 * Disconnect from the SignalR hub
 */
export const disconnect = async () => await connection.stop()