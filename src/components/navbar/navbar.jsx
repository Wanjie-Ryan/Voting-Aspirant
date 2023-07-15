import React, {useState} from 'react'
import './navbar.css'
import { Link, useNavigate } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import VLogo from '../../assets/icon-votes.jpg'
import { AiOutlineClose } from "react-icons/ai";
import {CgProfile} from 'react-icons/cg'
// import {Logcontext} from '../../context/Logcontext'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'


function Navbar() {

    const [shownav, setshownav] = useState(false);

    const [profile, setprofile] = useState(false)

    const showProfile =()=>{

        setprofile(!profile)
    }

    // const {aspirant} = useContext(Logcontext)
    const getCookie = Cookies.get('AspirantToken')

    const LogDetails = JSON.parse(localStorage.getItem('AspirantDetails'))

    // console.log(LogDetails)

      
    const name = LogDetails?.name || ' Guest'

    

    // console.log(getCookie)

    const navigate = useNavigate()

    const handleLogout =()=>{

        Cookies.remove('AspirantToken')

        navigate('/login')
    }
 


  return (


    <>


        <nav className="navbar">

            <div className='main-navbar'>

                    <div className="navbar--logo">

                        <div className="flip-box img-logo">

                            <div class="flip-box-inner">
                            <div class="flip-box-front">
                                <Link to="/" className ='home'>
                                {" "}

                                <img className="logo" src={VLogo} alt="logo" />

                                </Link>
                            </div>

                            <div class="flip-box-back">

                                <Link to="/" className ='home' style={{ textDecoration: "none" }}>

                                    Let's Unite and Vote, Sisi Voters!
                                
                                </Link>

                            </div>

                            </div>

                        </div>


                    </div>


                


                <div className="navbar--details">

                    <div className="flex-direction-left">

                         {getCookie && name ? (

                            <p className="name">Hello {name} </p>
                        ):(
                            <p className ='name'> Guest</p>
                        )}
                        

                        <p>

                            <Link to ="/" className="home">
                            Aspirant
                            </Link>

                        </p>

                        <p>

                            <Link to="/contact" className="home">
                            Contact
                            </Link>

                        </p>

                        <div className="profile">

                            <p> <CgProfile className="profile-icon-main" onClick ={showProfile} /> </p>

                            {profile &&(

                                
                                <div className="profile-content">

                                    <Link to ='/userprofile' className='link-prof prof-prof'>  <p>Edit Profile</p></Link>

                                    <hr></hr>

                                    <p className='link-prof' onClick ={handleLogout}>Logout</p>

                                </div>

                                )
                            }

                        </div>

                        
                    
                    </div>

                    <div className="signup-button">

                        <BiMenu className="menu" onClick={() => setshownav(!shownav)} />

                    </div>


                </div>

            </div>

        </nav>


         {shownav &&(

            <>
         
         <aside>

                    <div className="backdrop" onClick={() => setshownav(!shownav)}> </div>

                    <div className="side">

                        <div className="close-btn">

                            <AiOutlineClose
                            className="close"
                            onClick={() => setshownav(!shownav)}
                            />

                        </div>

                    </div>


                    <div className="side-logo">

                        <div className="side-main-logo">

                            <div className ='flip-box '>

                                <div className="flip-box-inner">

                                    <div className="flip-box-front main-logo">


                                        <Link to='/' className ='home'>

                                        <img src={VLogo} alt="" className="side-logos" />


                                        </Link>
                                    </div>


                                    <div className="flip-box-back">

                                        <Link to="/" className ='home' style={{ textDecoration: "none" }}>
                                            <p>

                                            Let's Unite and Vote, Sisi Voters!
                                            
                                            </p>
                                        </Link>

                                    </div>

                                </div>

                            </div>

                        </div>


                    </div>


                    <div className="side-details">

                       
                        <Link to ='/'><p>Aspirant</p></Link>
                        <hr></hr>
                        <a href= 'https://sisi-voters-client.vercel.app/'><p>Voter</p></a>



                    </div>


        </aside>

        </>
        
        )}

    
    </>


  )
}

export default Navbar