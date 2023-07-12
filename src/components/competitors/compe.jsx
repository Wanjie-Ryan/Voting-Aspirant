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

  const handlePrint = () => {

    // Create the report content
    const reportContent = allAspirants
      .map((Aspirants, index) => `${index + 1}. ${Aspirants.name} . ${Aspirants.Position}. ${Aspirants.Represent}`)
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
    const fileName = 'Aspirants_report.txt';
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

            <p className= 'voter-title'>Here are your Competitors:</p>


            <div className="table-container">

                <AiFillPrinter className='print' onClick ={handlePrint}/>

                {loading ?  <TbFidgetSpinner className ='spinner-loader'/> :(

                  
                      <table className="user-table">

                        <thead>

                            <tr>

                                <th>No.</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Represent</th>
                                <th>Vote Count</th>

                            </tr>

                        </thead>

                          {allAspirants? allAspirants.map((Aspirants, index)=>(

                            
                            <tbody>

                                <tr>

                                  <td>{index +1}</td>

                                  <td>
                                    
                                    <img src = {Aspirants.image} className ='img' alt = {Aspirants.name}/>
                                    
                                  </td>

                                  <td>{Aspirants.name}</td>

                                  <td>{Aspirants.Position}</td>

                                  <td>{Aspirants.Represent}</td>

                                  <td>John Doe</td>



                                </tr>

                            
                            </tbody>
                          )
                          ):(

                            <p>There are no other Aspirants</p>

                          )}

                      </table>

                )}

                {/* {errmsg && <p className ='error'>{errmsg}</p>} */}


            </div>

        </section>

    
  
    </>



  )
}

export default Compe