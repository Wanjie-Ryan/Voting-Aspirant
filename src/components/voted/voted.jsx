import React, {useState, useEffect} from 'react'
import './voted.css'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {AiFillPrinter} from 'react-icons/ai'



function Voted() {

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
                        <th>Name</th>

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

export default Voted













// {users.map((user, index) => (
                      
//   <tr key={index}>

//       {/* <td>{index + 1}</td> */}
//       <td>{user.firstName}</td>
      
//   </tr>
//   ))}