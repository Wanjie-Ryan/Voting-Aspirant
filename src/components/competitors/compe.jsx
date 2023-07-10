import React, {useState, useEffect} from 'react'
import './compe.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'


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


    const users = [
        {
          firstName: "John",
          lastName: "Doe",
          id: "123456",
          county: "Sample County",
          subCounty: "Sample Sub-County",
        },
        {
          firstName: "John",
          lastName: "Doe",
          id: "123456",
          county: "Sample County",
          subCounty: "Sample Sub-County",
        }
      ];

  return (



    <>

        <section className="voters-reports">



            <div className="table-container">
                <table className="user-table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>First Name</th>
                        {/* <th>Last Name</th> */}
                        <th>Email</th>
                        <th>Votes</th>
                        {/* <th>Sub-County</th> */}
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                        <td>{index + 1}</td>
                        <td>Customer</td>
                        <td>{user.firstName}</td>
                        {/* <td>{user.lastName}</td> */}
                        <td>{user.id}</td>
                        <td>{user.county}</td>
                        {/* <td>{user.subCounty}</td> */}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </section>

    
    
    
    
    </>



  )
}

export default Compe