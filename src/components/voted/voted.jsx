import React, {useState, useEffect} from 'react'
import './voted.css'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


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
                    <th>Name</th>
                    <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        {/* <td>Customer</td> */}
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        
                    </tr>
                    ))}
                </tbody>
                </table>

            </div>

        </section>

    
    </>


  )
}

export default Voted