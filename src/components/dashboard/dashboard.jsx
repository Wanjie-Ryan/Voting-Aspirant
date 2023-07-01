import React from 'react'
import './dashboard.css'
import {Link} from 'react-router-dom'




function Dashboard() {


  return (


    <>


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