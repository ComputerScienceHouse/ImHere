import * as signalr from '@microsoft/signalr'
import UserInfo from './UserInfo'

export const rtcApiUrl = 'https://localhost:7161/rtc/hub'

const connection = new signalr.HubConnectionBuilder()
    .withUrl(rtcApiUrl)
    .withAutomaticReconnect()
    .build()

/**
 * Start SignalR connection and register callbacks
 * @param events the array of event names and their callback functions
 */
export const startConnection = async (memberSignedInCallback: (member: UserInfo) => void) => {
    if (connection.state !== signalr.HubConnectionState.Disconnected)
        return console.warn('Connection to hub already started but startConnection was called. Ignoring...')

    console.info('Starting SignalR connection...')
    await connection.start().catch(e => {
        console.error(e)
        throw e
    })
    connection.on('MemberSignedIn', (member) => memberSignedInCallback(member as UserInfo))
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