import React from 'react'
import{Link} from 'react-router-dom'
const Login = () => {
  return (
    <div className='account login'>
        <div className='card'>
            <div className="card-head">
                <h1>Login</h1>
            </div>
            <div className="card-body">
                <form className='form'>
                    <div className='form-item'>
                        <label htmlFor="username">User Name</label>
                        <input type="text" name="username" id="username" placeholder='User Name' /> 
                    </div>

                    

                    <div className='form-item'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder='Password' />
                    </div>

                    <div className='form-item'>
                        <input type="button" value="Login" className='button' />
                    </div>

                    <Link to="/register" >Doesn't have an account</Link>
                </form>

            </div>
        </div>
        
    </div>
  )
}

export default Login