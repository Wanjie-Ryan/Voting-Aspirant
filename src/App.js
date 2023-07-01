import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Regpages from '../src/pages/register/register'
import LogPages from '../src/pages/login/login'
import DashPages from '../src/pages/dashboard/dashboard'
import VotesPages from '../src/pages/voted/voted'


function App() {


  return (


    <>


      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Regpages/>} />
          <Route path="/login" element={<LogPages/>} />
          <Route path="/dashboard" element={<DashPages/>} />
          <Route path="/voted" element={<VotesPages/>} />

        </Routes>
      
      </BrowserRouter>
    
    </>



  )
}

export default App