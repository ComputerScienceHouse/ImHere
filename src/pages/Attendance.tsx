import React, { useState } from 'react'
import { Card, CardBody, CardSubtitle, CardTitle, Input } from 'reactstrap'
import './Attendance.tsx.scss'
import { QrRenderer } from 'imhere-qgen'
import { Request } from '../Fetch'

interface Event {
    ID?: number
    Name: string
}

const Attendance = () => {
    const baseApiUri = 'https://localhost:7161/api/'
    const [payload, setPayload] = useState('https://localhost:3000/attendance/')
    const [event, setEvent] = useState<Event>({ Name: '' })
    const [qrReady, setQrReady] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    // setup effect to create attendance qr code
    // useEffect(() => {

    // }, [])

    const getEvent = async () => Request<number, Event>(baseApiUri + 'attendance', { method: 'POST' }, { Name: "Test Event" })
        .then(assignedID => {
            setPayload(`https://localhost:3000/attendance/${assignedID}`)
            setEvent({ ID: assignedID, Name: "Test Event" })
            setQrReady(true)
        }).catch(err => {
            console.error(`Error creating event: POST ${baseApiUri + 'attendance'}: ${err.message}`)
            setErrMsg(`Error creating event: POST ${baseApiUri + 'attendance'}: ${err.message}. API may be down or temporarily unavailable.`)
        })

    return (
        <Card>
            <CardBody>
                <CardTitle tag='h1'>Generate Attendance QR Code</CardTitle>
                <CardSubtitle className='mb-2 text-muted' tag='h6'>Add your event name below:</CardSubtitle>
                <p>TODO: add dropdown with events</p>
                <h3>Qr Debugging:</h3>
                {qrReady ?
                    <>
                        <p>Event: {event?.Name}</p>
                        <QrRenderer squareLength={10} payload={payload} />
                    </> :
                    <div style={{ width: '100%', height: '60vh' }}>
                        <div className='create-qr'>
                            <label htmlFor='event-name' className='eventname w-25 lead'>Event Name:</label>
                            <div className='input-container'>
                                <Input type='text' value={event?.Name} onChange={e => {
                                    const text = e.target.value
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
                            <button className='btn btn-primary btn-sm w-25 ml-5 mt-2 mb-2' onClick={getEvent}>Create</button>
                        </div>
                    </div>
                }
            </CardBody>
        </Card>
    )
}

export default Attendance