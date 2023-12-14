import React, { useState } from 'react'
import { Card, CardBody, CardSubtitle, CardText, CardTitle, Input } from 'reactstrap'
import './Attendance.tsx.scss'
import { QrRenderer } from 'imhere-qgen'
import { Request } from '../Fetch'
import UserInfo from '../UserInfo'
import { useOidcAccessToken } from '@axa-fr/react-oidc'
import UsersBox from '../components/UsersBox'

interface Event {
    ID?: number
    Name: string
}

const Attendance = () => {
    const baseApiUri = 'https://localhost:7161/api/'
    const [payload, setPayload] = useState('http://localhost:3000/signin/')
    const [event, setEvent] = useState<Event>({ Name: '' })
    const [qrReady, setQrReady] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    const { accessTokenPayload } = useOidcAccessToken()
    const userInfo = accessTokenPayload as UserInfo


    const testUsers: UserInfo[] = []
    for (let i = 0; i < 7; i++)
        testUsers.push(structuredClone(userInfo))
    // test users
    testUsers[1].preferred_username = 'samc'
    testUsers[1].given_name = 'Sam'
    testUsers[1].family_name = 'Cordry'
    testUsers[2].preferred_username = 'ethanf108'
    testUsers[2].given_name = 'Ethan'
    testUsers[2].family_name = 'Furguson'
    testUsers[3].preferred_username = 'qel'
    testUsers[3].given_name = 'Jeremy'
    testUsers[3].family_name = 'Smart'
    testUsers[4].preferred_username = 'mattyb'
    testUsers[4].given_name = 'Mathew'
    testUsers[4].family_name = 'Breidenbach'
    testUsers[5].preferred_username = 'mstrodl'
    testUsers[5].given_name = 'Mary'
    testUsers[5].family_name = 'Strodl'
    testUsers[6].preferred_username = 'cinnamon'
    testUsers[6].given_name = 'Andrew'
    testUsers[6].family_name = 'Simonson'
    const [users, setUsers] = useState<UserInfo[]>(testUsers)


    const getEvent = async () => {
        setErrMsg('')
        return await Request<number, Event>(baseApiUri + 'attendance', { method: 'POST' }, { Name: event.Name })
            .then(assignedID => {
                setPayload(`http://localhost:3000/signin/${assignedID}`)
                setEvent({ ID: assignedID, Name: event.Name })
                setQrReady(true)
            }).catch(err => {
                console.error(`Error creating event: POST ${baseApiUri + 'attendance'}: ${err.message}`)
                setErrMsg(`Error creating event: POST ${baseApiUri + 'attendance'}: ${err.message}. API may be down or temporarily unavailable.`)
            })
    }

    return (
        <Card>
            <CardBody>
                <CardTitle tag='h1'>Generate Attendance QR Code</CardTitle>
                {qrReady ?
                    <>
                        <CardText tag='h3'>Event {event.ID}: {event?.Name}</CardText>
                        <a href={payload}>Sign In Link</a>
                        <div className='d-flex flex-row'>
                            <QrRenderer squareLength={10} payload={payload} />
                            <UsersBox users={users} />
                        </div>
                    </> :
                    <>
                        <div style={{ width: '100%', height: '60vh' }}>
                            <CardSubtitle className='mb-2 text-muted' tag='h6'>Add your event name below:</CardSubtitle>
                            <div className='create-qr'>
                                <label htmlFor='event-name' className='eventname w-25 lead'>Event Name:</label>
                                <div className='input-container'>
                                    <Input type='text' value={event?.Name} onChange={e => {
                                        const text = e.target.value.trim()
                                        if (text.length === 0) {
                                            setErrMsg('Event name cannot be empty')
                                            setEvent({ Name: '' })
                                            return
                                        }
                                        setErrMsg('')
                                        setEvent({ Name: e.target.value })
                                    }} />
                                    {errMsg ?
                                        <p className='text-danger'>{errMsg}</p>
                                        : null
                                    }
                                </div>
                                <button className='btn btn-primary btn-sm w-25 ml-5 mt-2 mb-2' onClick={
                                    event.Name.length !== 0 ? getEvent : () => { setErrMsg('Event name cannot be empty') }
                                }>Create</button>
                            </div>
                        </div>
                    </>
                }
            </CardBody>
        </Card>
    )
}

export default Attendance