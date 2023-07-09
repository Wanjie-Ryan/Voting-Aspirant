import React, {useState, useEffect} from 'react'
import './profile.css'
import aspsimg from '../../assets/icon-votes.jpg'
import {BsFillPersonFill, BsFillImageFill} from 'react-icons/bs'
import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'

function Profile() {

    const navigate = useNavigate()

    useEffect(()=>{

        const checkAuth = async()=>{


            
            if(!Cookies.get().AspirantToken || Cookies.get().AspirantToken === undefined ){
                
                navigate('/')
            }

            else{

                const token = Cookies.get().AspirantToken

                const res = await axios({method:'get', url:'http://localhost:3007/api/aspirant/auth/verify', headers:{Authorization:'Bearer ' + token}, data:{}})

                if(res.data.type !== 'success'){

                    navigate('/')
                }


            }

            
        }

        checkAuth()



    }, [navigate])

    


  return (


    <>


        <section className ='main-profile'>

            <div className='profile-container'>

                <div className="profile-pic">

                    <img src= {aspsimg} className ='prof-pic-user' alt ='profile'/>


                </div>

                <div className="updating-details">

                    <div className ='update-img'>


                        <BsFillImageFill/>

                        <input type ='file' accept='image/*'/>


                    </div>

                    <div className ='name'>

                        <BsFillPersonFill/>

                        <input
                            type="text"
                            name="Name"
                            required
                            placeholder="Enter Your name"
                        />

                    </div>

                    <div className="reg-submit-btn">

                        
                        <button type="submit" className="btn-reg">Update Details</button> 
                            
                    
                     </div>



                </div>



            </div>



        </section>



    
    
    
    </>


  )
}

export default Profile