import React from 'react'
import './voted.css'



function Voted() {

    const users = [
        {
          firstName: "John",
          lastName: "Doe",
          id: "123456",
          county: "Sample County",
          subCounty: "Sample Sub-County",
        },
        {
          firstName: "John",
          lastName: "Doe",
          id: "123456",
          county: "Sample County",
          subCounty: "Sample Sub-County",
        }
      ];


  return (



    <>


        <section className="voters-reports">

            <div className="table-container">

                <table className="user-table">

                <thead>

                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        {/* <td>Customer</td> */}
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        
                    </tr>
                    ))}
                </tbody>
                </table>

            </div>

        </section>

    
    </>


  )
}

export default Voted