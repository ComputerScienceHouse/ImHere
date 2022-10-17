import React from 'react'
import { Card, CardBody, CardSubtitle, CardTitle } from 'reactstrap'
import './Attendance.tsx.scss'
import { QrRenderer, } from 'imhere-qgen'
import { GenPayload, GenV4ECIheader } from 'imhere-qgen/lib/encoding'

const Attendance = () => {
    const spayload = 'deez snuts'
    const payload = GenPayload(spayload, GenV4ECIheader)
    console.log('payload', payload)

    return (
        <Card>
            <CardBody>
                <CardTitle tag='h1'>Generate Attendance QR Code</CardTitle>
                <CardSubtitle className='mb-2 text-muted' tag='h6'>Select an event below:</CardSubtitle>
                <p>TODO: add dropdown with events</p>
                <h3>Qr Debugging:</h3>
                <QrRenderer squareLength={10} payload={'HelloWorld!'} />
            </CardBody>
        </Card>
    )
}

export default Attendance