import React, { useState } from 'react'
import { Card, CardBody, CardSubtitle, CardText, CardTitle, Input } from 'reactstrap'
import './Attendance.tsx.scss'
import { QrRenderer } from 'imhere-qgen'
import { Request } from '../Fetch'

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
                        <QrRenderer squareLength={10} payload={payload} />
                    </> :
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
                }
            </CardBody>
        </Card>
    )
}

export default Attendance