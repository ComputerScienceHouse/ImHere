import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Home.tsx.scss'
import { Request } from '../Fetch'

interface GithubResponse {
  sha: string
}

const Home = () => {
  const [lastCommit, setLastCommit] = React.useState('https://github.com/ComputerScienceHouse/ImHere/commit/')
  const [commitHash, setCommitHash] = React.useState('Loading...')

  useEffect(() => {
    console.log('fetching last commit')
    Request<GithubResponse>('https://api.github.com/repos/ComputerScienceHouse/ImHere/commits/master', { method: 'GET' })
      .then(json => {
        setLastCommit(l => l + json.sha)
        setCommitHash(json.sha)
      })
      .catch(err => {
        console.error(err)
        setCommitHash('Github')
      })
  }, [])

  return (
    <div>
      {<div className='card mb-3'>
        <h5 className='card-header bg-primary'><a className='text-white' href='https://plug.csh.rit.edu'>Advertisements by CSH: Plug</a></h5>
        <div className='card-body center'>
          <a href='https://plug.csh.rit.edu'><img alt='cringe ads coming soon' src='https://plug.csh.rit.edu/data' style={{ width: '100%' }} /></a>
        </div>
      </div>}
      <div className='homepage-container'>
        <h1 className='display-3'>Hey! ImHere!</h1>
        <p className='lead'>Get started by filling out a new attendance form or scanning a QR code.</p>
        <hr className='my-4' />
        <p className='lead'>
          <Link className='btn btn-primary btn-lg' to='/attendance' role='button'>Generate attendance QR code</Link>
        </p>
        <div className='footer'>
          <a href={lastCommit}>{commitHash.slice(0, 8)}</a>
        </div>
      </div>
    </div>
  )
}

export default Home