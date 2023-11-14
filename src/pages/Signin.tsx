import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import Loading from '../callbacks/Loading';
import { Card, CardBody, CardSubtitle, CardTitle } from 'reactstrap';
import { Request } from '../Fetch';
import UserInfo from '../UserInfo';
import { useOidcAccessToken } from '@axa-fr/react-oidc';
import { Attendance } from '../types/Attendance';

const Signin: React.FC = () => {
    const baseApiUri = 'https://localhost:7161/api/'
    let { id } = useParams();
    let [signedIn, setSignedIn] = React.useState(false)
    let [errorMsg, setErrorMsg] = React.useState<string>('')
    let [attendance, setAttendance] = React.useState<Attendance>({ name: '' })
    let [statusCode, setStatusCode] = React.useState<number>(0)

    const { accessTokenPayload } = useOidcAccessToken()
    const userInfo = accessTokenPayload as UserInfo

    useEffect(() => {
        console.log(baseApiUri + 'attendance/' + id)
        let status = [503] // we use an array so we can pass by reference
        Request<Attendance | string, UserInfo>(baseApiUri + 'attendance/' + id, { method: 'PUT' }, userInfo, status)
            .then(attendance => {
                console.log('Attendance found: ' + attendance)
                if (typeof attendance === 'string')
                    throw new Error(attendance)

                setSignedIn(true)
                setAttendance(attendance as Attendance)
            }).catch(err => {
                setStatusCode(status[0])
                switch (status[0]) {
                    case 503:
                        setErrorMsg(`Error signing into event: PUT ${baseApiUri + 'attendance/' + id}: ${err.message}. API may be down or temporarily unavailable.`)
                        break
                    case 404:
                        setErrorMsg(`Error signing into event: PUT ${baseApiUri + 'attendance/' + id}: ${err.message}. Event not found.`)
                        break
                    case 400:
                        setErrorMsg(`Error signing into event: PUT ${baseApiUri + 'attendance/' + id}: ${err.message}. Member is already signed in.`)
                        break
                    case 418:
                        setErrorMsg(`Error signing into event: PUT ${baseApiUri + 'attendance/' + id}: ${err.message}. Member has been blacklisted from this event. Imagine scanning a code and dipping from the event. Get tea-bagged bozo.`)
                        break
                    default:
                        setErrorMsg(err.message)
                }
                console.error(err)
            })
    }, [userInfo, id])

    return (
        <Card>
            <CardBody>
                <CardTitle tag='h1'>
                    {signedIn ? `Signed in to ${attendance.name}` : errorMsg.length !== 0 ? `Error ${statusCode === 0 ? '' : statusCode} :(` : 'Signing in...'}
                </CardTitle>
                {signedIn ? <>
                    <CardSubtitle className='text-muted' tag='h4'>Do you see your name onscreen?</CardSubtitle>
                </> : errorMsg.length !== 0 ? <div className='text-danger'>{errorMsg}</div> : <Loading />}
            </CardBody>
        </Card>
    )
}

export default Signin