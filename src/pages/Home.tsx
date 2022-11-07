import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      {/*<div className='card mb-3'>
        <h5 className='card-header bg-primary'><a className='text-white' href='https://plug.csh.rit.edu'>Advertisements by CSH: Plug</a></h5>
        <div className='card-body center'>
          <a href='https://plug.csh.rit.edu'><img src='https://plug.csh.rit.edu/data' style={{ width: '100%' }} /></a>
        </div>
  </div>*/}
      <h1 className='display-3'>Hey! ImHere!</h1>
      <p className='lead'>Get started by filling out a new attendance form or scanning a QR code.</p>
      <hr className='my-4' />
      <p className='lead'>
        <Link className='btn btn-primary btn-lg' to='/attendance' role='button'>Generate attendance QR code</Link>
      </p>
    </div>
  )
}

export default Home