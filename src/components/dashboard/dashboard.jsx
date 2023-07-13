import React,{useState, useEffect} from 'react'
import './dashboard.css'
import {Link, useNavigate} from 'react-router-dom'
// import Nav from './nav'
import Cookies from 'js-cookie'
import axios from 'axios'

function Dashboard() {

    // const config = {
    //     method: 'post',
    //     maxBodyLength: Infinity,
    //     url: 'http://localhost:3007/api/aspirant/auth/login',

    //     headers: {

    //       Authorization: 'Bearer ' + authToken,
          
    //     },
    //     data: data,
    // }

    const navigate = useNavigate()

    // const [islogged, setIsLogged] = useState(false)

        useEffect(() => {

            const checkauth = async () => {

                    if (!Cookies.get().AspirantToken || Cookies.get().AspirantToken === undefined) {

                        // No token found, redirect to login page
                        // console.log('not logged in (token not found)')
                        // setIsLogged(false)

                        navigate('/login')
                    } 
                    else {

                        const token = Cookies.get().AspirantToken
                        const res = await axios({method:'get', url:'https://voting-server-7g7j.onrender.com/api/aspirant/auth/verify', headers:{Authorization:'Bearer ' + token}, data:{}})
                        if (res.data.type !== 'success') {
                        // console.log('not logged in (invalid token)')

                        navigate('/login')

                        // setIsLogged(false)
                        }
                        // setIsLogged(true)
                    }

            }

            checkauth()

        }, [navigate])

  return (


    <>

        {/* <Nav/> */}

        <section className ='dashboard'>

            <div className ='dashboard__container'>


                <div className="orders">

                    <h3 className='orders-title'>Who Voted For You</h3>

                    <Link to='/voted'><div className="lm"><button className="next-page">Know Them</button></div></Link>



                </div>


                <div className="reports">

                    <h3 className='orders-title'>Your Competitors</h3>

                    <Link to ='/competitors'><div className="lm"><button className="next-page">Know Them</button></div></Link>


                </div>

            </div>



        </section>




    
    
    
    
    </>


  )
}

export default Dashboard