import React from 'react'
import { Card, CardBody, CardSubtitle, CardTitle } from 'reactstrap'
import './Attendance.tsx.scss'
import { QrRenderer, } from 'imhere-qgen'
import { GenV4Payload, BitpayloadToCodewords, SplitDataCodewordsV4Q, GenFormatInformation, ErrorCorrectionLevel, MaskPattern } from 'imhere-qgen/lib/encoding'
import { Term, ParsePolynomial, PolynomialToBitString } from 'imhere-qgen/lib/polymath'

const Attendance = () => {
    // const spayload = 'https://imhere.csh.rit.edu/imhere&eventid=234567890987654321&state=0'
    // // 68 chars max for now...
    // const payload = GenV4Payload(spayload)
    // //console.log('payload', payload)
    // const codewords = BitpayloadToCodewords(payload)
    // console.log(`codewords for ${spayload} (${spayload.length} chars)`, codewords)
    // const blocks = SplitDataCodewordsV4Q(codewords)
    // console.log(`blocks for ${spayload}`, blocks)

    const spoly = '45x^4+x^2+x+1'
    const poly = ParsePolynomial(spoly)
    console.log(`poly for ${spoly}`, poly)

    const BCH155 = 'x^10+x^8+x^5+x^4+x^2+x+1'
    const bitFromPoly = PolynomialToBitString(BCH155)
    console.log(`bitFromPoly for ${BCH155}`, bitFromPoly)

    const formatInfo = GenFormatInformation(ErrorCorrectionLevel.M, MaskPattern.M110)
    console.log(`FormatInfo bits for level M and pattern M110`, formatInfo)
    console.log('FormatInfo in bit form', formatInfo.map(e => e ? 1 : 0).join(''))

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