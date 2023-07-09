import React, {useState, useEffect} from 'react'
import './profile.css'
import aspsimg from '../../assets/icon-votes.jpg'
import {BsFillPersonFill, BsFillImageFill} from 'react-icons/bs'
import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import {Image} from 'cloudinary-react'
import sweetAlert from 'sweetalert2'
import {TbFidgetSpinner} from 'react-icons/tb'


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

    const storageData = JSON.parse(localStorage.getItem('AspirantDetails'))

    // console.log(storageData)

    const imageString = storageData.image

    // console.log(imageString)

    const [loading, setloading] = useState(false)
    const [errmsg, seterrmsg] = useState('')
    const [image, setimage] = useState('')
    const [name, setname] = useState('')

    const handleName = (e)=>{

        setname(e.target.value)
    }

    const updateDetails = async (e)=>{

        e.preventDefault()

        try{




        }

        catch(err){

            setTimeout(()=>{

                seterrmsg('There seems to be an error, Please refresh the page and Try again')

            },2000)
            console.log(err)
            setloading(false)


        }
    }

    


  return (


    <>


        <section className ='main-profile'>

            <div className='profile-container'>

                <div className="profile-pic">

                    {/* <img src= {aspsimg} className ='prof-pic-user' alt ='profile'/> */}

                    <Image cloudName ='https://api.cloudinary.com/v1_1/djgk2k4sw/image/upload' publicId ={imageString} className ='prof-pic-user' alt ='profile'/>


                </div>

                <div className="updating-details">

                    <div className ='update-img'>


                        <BsFillImageFill/>

                        <input type ='file' name ='image' onChange ={(e)=>{setimage(e.target.files[0])}} accept='image/*'/>


                    </div>

                    <div className ='name'>

                        <BsFillPersonFill/>

                        <input
                            type="text"
                            name="name"
                            value ={name}
                            onChange ={handleName}
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