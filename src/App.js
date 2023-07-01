import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Regpages from '../src/pages/register/register'
import LogPages from '../src/pages/login/login'


function App() {


  return (


    <>


      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Regpages/>} />
          <Route path="/login" element={<LogPages/>} />







        </Routes>
      
      
      
      </BrowserRouter>



    
    
    
    
    
    </>



  )
}

export default App