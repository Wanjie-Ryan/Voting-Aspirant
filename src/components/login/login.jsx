import React from 'react'
import './login.css'



function Login() {



  return (


    <>


        <section className="login-part">


            <form className="login" >
                <h2 className="sign-in-h2">Sign-In to the G2F-Connect platform</h2>

                <input
                type="text"
                value={id}
                placeholder="Id"
                onChange={(e) => setId(e.target.value)}
                required
                />

                <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                />

                <button className="sign-in-btn" disabled={isFetching}>
                {isFetching ? "Loading..." : "Submit"}
                </button>

                <p style={{ color: "red" }}>
                {error ? "something went wrong" : null  }
                </p>

                <p className="sign-in-p">
                Don't have an account?
                <strong>
                    <Link to="/register" className="alaccount">
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