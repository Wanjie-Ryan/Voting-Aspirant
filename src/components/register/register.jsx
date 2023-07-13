import React, {useState, useContext} from 'react'
import './register.css'
import {Link} from 'react-router-dom'
import voterpic from '../../assets/fingers-vote.jpg'
import {BsFillPersonFill,BsFillTelephoneFill,BsFillImageFill} from 'react-icons/bs'
import {MdEmail} from 'react-icons/md'
import {FaPoll,FaSchool} from 'react-icons/fa'
import {RiLockPasswordFill} from 'react-icons/ri'
import axios from 'axios'
import {RegContext} from '../../context/Regcontext'
import sweetAlert from 'sweetalert2'
import {useNavigate} from 'react-router-dom'
import {TbFidgetSpinner} from 'react-icons/tb'



function Register() {

  // const [imageupload, setImageupload] = useState(false)

  const [succmsg, setsuccmsg] = useState('')
  const [load, setload] = useState(false)
  const [errormsg, seterrormsg] = useState('')
  const [image, setImage] = useState()
  const [name, setName] =useState()
  const [email, setEmail] =useState()
  const [contact, setContact] =useState()
  const [position, setPosition] =useState()
  const [represent, setRepresent] =useState()
  const [password, setPassword] =useState()
  
  const {aspirant, loading, error, dispatch} = useContext(RegContext)
  const navigate = useNavigate()


  const handleName =(e)=>{

    setName(e.target.value)
  }

  const handleEmail =(e)=>{

    setEmail(e.target.value)
  }

  const handleContact=(e)=>{

    setContact(e.target.value)
  }

  const handlePosition =(e)=>{

    setPosition(e.target.value)
  }

  const handleRep =(e)=>{

    setRepresent(e.target.value)
  }

  const handlePwd =(e)=>{

    setPassword(e.target.value)
  }


  const handleSubmit = async(e)=>{

    e.preventDefault()

    if(!image || !name || !email || !contact ||!position || !represent ||!password){

      sweetAlert.fire({

        icon:'error',
        title:'oops...',
        text:'Please Enter all Details of the Submission form'
      })

      return

    }

    setload(true)

    dispatch({type:'regStart'})


    try{

      const formData = new FormData()
      formData.append('file', image)
      formData.append('upload_preset', 'kjddwm8s')

      const imageData = await axios.post('https://api.cloudinary.com/v1_1/djgk2k4sw/image/upload', formData)

      // console.log(imageData)

      const submissionData = {

        image:imageData.data.secure_url,
        name:name,
        email:email,
        phoneNumber:contact,
        Position:position,
        Represent:represent,
        Password:password
       
      }

      const regData = await axios.post('https://voting-server-7g7j.onrender.com/api/aspirant/auth/register', submissionData)

      // console.log(regData)

      dispatch({type:'regComplete', payload:regData.data})

      sweetAlert.fire({

        title:'Registration Successful',
        text:regData.data.msg,
        icon:'success',
        button:'Go To Login'
      }).then(()=>{

        setTimeout(()=>{

          navigate('/login')

        },2000)

      })

      setload(false)


    }

    catch(err){

      dispatch({type:'regFail', payload:err})
      // console.log(err)
      setTimeout(()=>{

        seterrormsg('There seems to be an error while logging in, Refresh The Page and try Again')

      }, 2000)

      setload(false)

    }


  }


  return (



    <>


    <section className="registration">


        <div className="set-up-account">

          <form action="" className="register" onSubmit={handleSubmit}>

            <div className="header">

              <p className="first-p">Let's Set up your account</p>

              <p className="sec-p">
                Already have an account?

                <Link to="/login">
                  <span className="sign-in">Sign In</span>
                </Link>

              </p>

            </div>

            <div className="fill-form-content">


                <div className='name'>


                  <BsFillImageFill/>

                  <input type ='file' accept='image/*' name ='image'  onChange = {(e)=>{setImage(e.target.files[0])}}/>


                  
                </div>

                <div className ='name'>

                    <BsFillPersonFill/>

                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="Enter Your name"
                        value ={name}
                        onChange ={handleName}
                    />

                </div>


                <div className ='name'>

                    <MdEmail/>

                    <input
                        type="text"
                        name="email"
                        onChange ={handleEmail}
                        value ={email}
                        required
                        placeholder="Enter your Email"
                    />

                </div>

                <div className='name'>

                    <BsFillTelephoneFill/>

                    <input
                        type="tel"
                        name="contact"
                        onChange={handleContact}
                        value ={contact}
                        required
                        placeholder=" Enter your phone number"
                    />

                </div>


                <div className="name">

                    <FaPoll/>
                    <select name ='position' onChange ={handlePosition} value ={position}>

                        <option value="" disabled selected>Vying Position</option>
                        <option>President</option>
                        <option>Deputy President</option>
                        <option>Treasurer</option>
                        <option>Secretary General</option>
                        <option>Delegate</option>

                    </select>

                </div>


                <div className="name">

                    <FaSchool/>

                    <select name='represent' onChange={handleRep} value ={represent}>
                        
                        <option value="" disabled selected>School You Represent</option>
                        <option>Engineering and Technology</option>
                        <option>Science and Humanities</option>
                        <option>Economics</option>
                        <option>Education</option>
                        <option>Environment, water and Fishery</option>

                    </select>

                </div>

                <div className ='name'>

                    <RiLockPasswordFill/>

                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="password"
                        onChange={handlePwd}
                        value ={password}
                    />

                </div>

              <div className="reg-submit-btn">

                {/* <Link to="/login"> */}

                    {errormsg ? <p className='error-msg'>{errormsg}</p> : (


                      
                      <button type="submit" className="btn-reg" disabled ={load}> {load? <TbFidgetSpinner className='spinner-loader'/> :'Submit'} </button>
                      
                      )
                    } 
                    
                {/* </Link>  */}
                
              </div>

              <div className="terms">

                <p className="terms-p">

                  By clicking 'Submit' you agree to creating a free account, and
                  to <span className="sign-in"> Terms & Conditions</span> and{" "}
                  <span className="sign-in">Privacy Policy.</span>
                </p>

              </div>

            </div>

          </form>


          <div className="reg-farmer">
            <div className="inner-reg">

              <div className="img">

                <img src={voterpic} alt="voter" className="img-farmer-reg" />

              </div>

              <div className="right-text">
                <p className="tt">Sisi Voters!</p>

                <p className="st">
                    Let's Unite and Vote, Sisi Voters!
                </p>

              </div>
            </div>
          </div>
        </div>
    </section>


    
    
    
    </>





  )
}

export default Register