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
import {FiLogOut} from 'react-icons/fi'



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

        setloading(true)

        try{

            const aspirantId = JSON.parse(localStorage.getItem('AspirantDetails'))

            console.log(aspirantId)

            const id = aspirantId.id

            const formData = new FormData()
            formData.append('file', image)
            formData.append('upload_preset', 'kjddwm8s')

            const imageData = await axios.post('https://api.cloudinary.com/v1_1/djgk2k4sw/image/upload', formData)

            console.log(imageData)

            const updateData ={

                image:imageData.data.secure_url,
                name:name
            }

            const dataUpdated = await axios.patch(`http://localhost:3007/api/aspirant/updateaspirant/${id}`, updateData)

            console.log(dataUpdated)

            const details={

                id:dataUpdated.data.updateaspirant._id,
                image:dataUpdated.data.updateaspirant.image,
                name:dataUpdated.data.updateaspirant.name
            }
            
            localStorage.removeItem('AspirantDetails')

            localStorage.setItem('AspirantDetails', JSON.stringify(details))

            sweetAlert.fire({

                title:'Details updated Successfully',
                text:dataUpdated.data.msg,
                icon:'success',
                
              })


              setloading(false)
        

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

                

                <form className="updating-details" onSubmit ={updateDetails}>

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

                        {errmsg ? <p className ='error-msg'>{errmsg}</p>:(


                            
                            <button type="submit" className="btn-reg" disabled ={loading}>{loading ? <TbFidgetSpinner className ='spinner-loader'/>: 'Update Details'}</button> 
                            
                        )}
                    
                     </div>



                </form>

                {/* <div>
                    <FiLogOut/>
                </div> */}



            </div>



        </section>



    
    
    
    </>


  )
}

export default Profile