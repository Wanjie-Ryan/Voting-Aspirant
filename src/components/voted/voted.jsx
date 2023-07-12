import React, {useState, useEffect} from 'react'
import './voted.css'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {AiFillPrinter} from 'react-icons/ai'



function Voted() {

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
  const [allvoters, setallvoters] = useState()

  const LSItems = JSON.parse(localStorage.getItem('AspirantDetails'))

  // console.log(LSItems)

  const LSID = LSItems.id

  // console.log(LSID)

  useEffect(()=>{

    const getVoted = async()=>{

      try{

        setloading(true)

        const specificVoters = await axios.get(`http://localhost:3007/api/aspirant/allvoters/${LSID}`)
        // console.log(specificVoters)

        const yesvoted = specificVoters.data.voters
        // console.log(yesvoted)

        setallvoters(yesvoted)

        // console.log(allvoters)

        setloading(false)


      }

      catch(err){

        console.log(err)
        seterrmsg('There seems to be an error, please refresh the page')
        setloading(false)


      }


    }

    getVoted()


  },[])

    


  return (



    <>


        <section className="voters-reports">

            <div className="table-container">

                <AiFillPrinter className='print'/>

                <table className="user-table">

                  <thead>

                        <tr>

                        <th>No.</th>
                        <th>Name</th>

                        </tr>
                  </thead>

                  <tbody>

                    <tr>

                      <td>1</td>
                      <td>John Doe</td>

                    </tr>

                    <tr>

                      <td>2</td>
                      <td>Jane Smith</td>

                    </tr>

                    <tr>

                      <td>3</td>
                      <td>Jane Smith</td>

                    </tr>

                      

                  </tbody>

                </table>

                {errmsg && <p className ='error'>{errmsg}</p>}

            </div>

        </section>

    
    </>


  )
}

export default Voted













// {users.map((user, index) => (
                      
//   <tr key={index}>

//       {/* <td>{index + 1}</td> */}
//       <td>{user.firstName}</td>
      
//   </tr>
//   ))}