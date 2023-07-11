import React, {useState, useEffect} from 'react'
import './compe.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import {AiFillPrinter} from 'react-icons/ai'




function Compe() {

  const navigate = useNavigate()

  useEffect(()=>{


    const checkAuth = async()=>{

      if(!Cookies.get().AspirantToken || Cookies.get().AspirantToken === undefined){

        navigate('/login')
      }

      else{

        const token = Cookies.get().AspirantToken
        const res = await axios({method:'get', url:'http://localhost:3007/api/aspirant/auth/verify', headers:{Authorization:'Bearer ' + token}, data:{}})
        if (res.data.type !== 'success') {

          // console.log('not logged in (invalid token)')

          navigate('/login')

        }

      }

    }

    checkAuth()


  }, [navigate])


    

  return (



    <>

        <section className="voters-reports">

            <div className="table-container">

                <AiFillPrinter className='print'/>


                <table className="user-table">

                    <thead>

                        <tr>

                            <th>No.</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Represent</th>
                            <th>Vote Counts</th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr>

                          <td>1</td>

                          <td>John Doe</td>

                        </tr>

                        <tr>

                          <td>2</td>
                          <td>Jane Smith</td>

                        </tr>


                    
                    </tbody>

                </table>

            </div>

        </section>

    
  
    </>



  )
}

export default Compe