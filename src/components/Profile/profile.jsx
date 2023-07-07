import React from 'react'
import './profile.css'
import aspsimg from '../../assets/icon-votes.jpg'
import {BsFillPersonFill, BsFillImageFill} from 'react-icons/bs'



function Profile() {


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