import React, {useState} from 'react'
import './login.css'
import {MdEmail} from 'react-icons/md'
import {Link} from 'react-router-dom'
import {RiLockPasswordFill} from 'react-icons/ri'
import axios from 'axios'
import {TbFidgetSpinner} from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import sweetAlert from 'sweetalert2'


function Login() {

    const [errmsg, seterrmsg] = useState()
    const [loading, setloading] = useState(false)
    const [email, setemail] = useState('')
    const [pwd, setpwd] = useState('')
    
    const navigate = useNavigate()

    const handleEmail =(e)=>{

        setemail(e.target.value)
    }

    const handlePwd =(e)=>{

        setpwd(e.target.value)
    }

    const handleLogin = async (e)=>{

        e.preventDefault()

        if(!email || !pwd){

            sweetAlert.fire({

                icon:'error',
                title:'oops...',
                text:'Please Enter all Details of the Submission form'

            })

            return

        }

        setloading(true)

        try{

            const loginData ={

                email:email,
                Password:pwd
            }


            const LoginData = await axios.post('http://localhost:3007/api/aspirant/auth/login', loginData)

            console.log(LoginData)

            sweetAlert.fire({

                title:'Login Successful',
                text:LoginData.data.msg,
                icon:'success',
                button:'Go To Dashboard'

            }).then(()=>{

                setTimeout(()=>{

                    navigate('/dashboard')

                },2000)

            })

            console.log(document.cookie)

            setloading(false)



        }

        catch(err){

            setTimeout(()=>{

                seterrmsg('There has been issue, please refresh and Try again')

            },1000)
            console.log(err)
            setloading(false)

        }
    }



  return (


    <>


        <section className="login-part">


            <form className="login" onSubmit ={handleLogin} >

                <h2 className="sign-in-h2">Sign-In to Sisi Voters</h2>

                <div className="name">

                    <MdEmail/>

                     <input
                        type="email"
                        name = 'email'
                        value ={email}
                        onChange ={handleEmail}
                        placeholder="Enter your email"
                        required
                    />

                </div>

                <div className="name">  

                    <RiLockPasswordFill/>

                    <input
                    type="password"
                    name ='pwd'
                    value ={pwd}
                    onChange={handlePwd}
                    placeholder=" Enter your Password"
                    required
                    />

                </div>

                {/* <Link to ='/dashboard'> */}



                    {errmsg ? <p className ='error-msg'>{errmsg}</p>:(


                        
                        <button type='submit'  disabled={loading} className="sign-in-btn">{loading ? <TbFidgetSpinner className='spinner-loader'/> : 'Submit'}</button>
                        
                        )
                    }
                    
                {/* </Link> */}

               
                <p className="sign-in-p">
                Don't have an account?
                
                <strong>
                    <Link to="/" className="alaccount">
                     Register
                    </Link>
                </strong>
                </p>
            </form>


        </section>
    
    
    </>



  )
}

export default Login