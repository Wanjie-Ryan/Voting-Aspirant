import React, {useState} from 'react'
import './register.css'
import {Link} from 'react-router-dom'
import voterpic from '../../assets/fingers-vote.jpg'
import {BsFillPersonFill,BsFillTelephoneFill,BsFillImageFill} from 'react-icons/bs'
import {MdEmail} from 'react-icons/md'
import {FaPoll,FaSchool} from 'react-icons/fa'
import {RiLockPasswordFill} from 'react-icons/ri'





function Register() {


  const [image, setImage] = useState()
  const [name, setName] =useState()
  const [email, setEmail] =useState()
  const [contact, setContact] =useState()
  const [position, setPosition] =useState()
  const [represent, setRepresent] =useState()
  const [password, setPassword] =useState()


  const handleImage =(e)=>{

    setImage(e.target.value)

  }

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


  return (



    <>


    <section className="registration">


        <div className="set-up-account">

          <form action="" className="register">

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

                  <input type ='file' accept='image/*' name ='image' onChange ={handleImage}/>


                  
                </div>

                <div className ='name'>

                    <BsFillPersonFill/>

                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="Enter Your name"
                        onChange ={handleName}
                    />

                </div>


                <div className ='name'>

                    <MdEmail/>

                    <input
                        type="text"
                        name="email"
                        onChange ={handleEmail}
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
                        required
                        placeholder=" Enter your phone number"
                    />

                </div>


                <div className="name">

                    <FaPoll/>
                    <select name ='position' onChange ={handlePosition}>

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

                    <select name='represent' onChange={handleRep}>
                        
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
                    />

                </div>

              <div className="reg-submit-btn">

                <Link to="/login">

                    <button type="submit" className="btn-reg">Submit</button> 
                    
                </Link> 
                
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