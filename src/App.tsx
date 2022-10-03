import React from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <div>
        <h1>
          Hello I am a header.
        </h1>
      </div>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </Router>
    )
}

export default App
