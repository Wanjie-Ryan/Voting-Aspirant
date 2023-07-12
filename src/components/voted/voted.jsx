import React, {useState, useEffect} from 'react'
import './voted.css'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {AiFillPrinter} from 'react-icons/ai'
import {TbFidgetSpinner} from 'react-icons/tb'



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
  const [allvoters, setallvoters] = useState([])

  const LSItems = JSON.parse(localStorage.getItem('AspirantDetails'))

  // console.log(LSItems)

  const LSID = LSItems.id

  // console.log(LSID)

  useEffect(()=>{

    const getVoted = async()=>{

      try{

        setloading(true)

        const specificVoters = await axios.get(`http://localhost:3007/api/aspirant/allvoters/${LSID}`)
        console.log(specificVoters)

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


  },[LSID])


  //DOWNLOADING REPORT  

  const handlePrint = () => {

    // Create the report content
    const reportContent = allvoters
      .map((voters, index) => `${index + 1}. ${voters.name}`)
      .join('\n');

    // Create a temporary element to hold the report content
    const tempElement = document.createElement('textarea');
    tempElement.value = reportContent;

    // Append the temporary element to the document body
    document.body.appendChild(tempElement);

    // Select the content of the temporary element
    tempElement.select();
    tempElement.setSelectionRange(0, 99999); // For mobile devices

    // Copy the selected content to the clipboard
    document.execCommand('copy');

    // Remove the temporary element
    document.body.removeChild(tempElement);

    // Trigger the download of the report
    const fileName = 'voters_report.txt';
    const data = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(data);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();

    // Release the URL object
    window.URL.revokeObjectURL(url);

  };



    


  return (



    <>


        <section className="voters-reports">

            <p className= 'voter-title'>Those who voted for you are:</p>

            <div className="table-container">

                <AiFillPrinter className='print' onClick ={handlePrint} title ='print report'/>

                {loading ? <TbFidgetSpinner className ='spinner-loader'/> :(

                  <table className="user-table">

                      <thead>

                            <tr>

                            <th>No.</th>
                            <th>Name</th>

                            </tr>
                      </thead>

                        {allvoters? allvoters.map((voters, index)=>(

                          
                          <tbody key ={voters.id}>

                            <tr>

                              <td>{index + 1}</td>
                              <td>{voters.name}</td>

                            </tr>

                            
                              

                          </tbody>

                          )):(

                            <p>You have no voters</p>
                          )

                        }

                  </table>

                )
                }

                {errmsg && <p className ='error'>{errmsg}</p>}

            </div>

        </section>

    
    </>


  )
}

export default Voted













