import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Regpages from '../src/pages/register/register'



function App() {


  return (


    <>


      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Regpages/>} />





        </Routes>
      
      
      
      </BrowserRouter>



    
    
    
    
    
    </>



  )
}

export default App