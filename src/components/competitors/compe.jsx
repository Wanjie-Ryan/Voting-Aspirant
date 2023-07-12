import React, {useState, useEffect} from 'react'
import './compe.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import {AiFillPrinter} from 'react-icons/ai'
import {TbFidgetSpinner} from 'react-icons/tb'




function Compe() {

  const navigate = useNavigate()

  useEffect(()=>{


    const checkAuth = async()=>{

      if(!Cookies.get().AspirantToken || Cookies.get().AspirantToken === undefined){

        navigate('/login')
      }

      else{

        const token = Cookies.get().AspirantToken
        const res = await axios({method:'get', url:'http://localhost:3007/api/aspirant/auth/verify', headers:{Authorization:'Bearer ' + token}, data:{}})
        if (res.data.type !== 'success') {

          // console.log('not logged in (invalid token)')

          navigate('/login')

        }

      }

    }

    checkAuth()


  }, [navigate])

  const [loading, setloading] = useState(false)
  const [errmsg, seterrmsg] = useState()
  const [allAspirants, setallAspirants] = useState([])

  useEffect(()=>{

    const getCompe = async()=>{

      
      try{
        
        setloading(true)

        const getAllAspirants = await axios.get('http://localhost:3007/api/admin/allaspirants')
        
        console.log(getAllAspirants)

        const asps = getAllAspirants.data.allaspirants

        console.log(asps)

        setallAspirants(asps)

        setloading(false)
      }

      catch(err){

        console.log(err)
        seterrmsg('There seems to be an error, refresh the page')
        setloading(false)

      }

    }

    getCompe()



  },[])


    

  return (



    <>

        <section className="voters-reports">

            <p className= 'voter-title'>Here are your Competitors:</p>


            <div className="table-container">

                <AiFillPrinter className='print'/>


                <table className="user-table">

                    <thead>

                        <tr>

                            <th>No.</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Represent</th>
                            <th>Vote Counts</th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr>

                          <td>1</td>

                          <td>John Doe</td>

                        </tr>

                    
                    </tbody>

                </table>

                {/* {errmsg && <p className ='error'>{errmsg}</p>} */}


            </div>

        </section>

    
  
    </>



  )
}

export default Compe