import React from 'react'
import { Card, CardBody, CardSubtitle, CardTitle } from 'reactstrap'
import './Attendance.tsx.scss'
import { QrRenderer } from 'imhere-qgen'

const Attendance = () => {
    return (
        <Card>
            <CardBody>
                <CardTitle tag='h1'>Generate Attendance QR Code</CardTitle>
                <CardSubtitle className='mb-2 text-muted' tag='h6'>Select an event below:</CardSubtitle>
                <p>TODO: add dropdown with events</p>
                <h3>Qr Debugging:</h3>
                <QrRenderer squareLength={8} payload={'HelloWorld!'} squares={[]} />
            </CardBody>
        </Card>
    )
}

export default Attendance