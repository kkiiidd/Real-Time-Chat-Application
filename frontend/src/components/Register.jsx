import React from 'react'
import {Link} from 'react-router-dom';
const Register = () => {
  return (
    <div className='account register'>
        <div className='card'>
            <div className="card-head">
                <h1>Register</h1>
            </div>
            <div className="card-body">
                <form className='form'>
                    <div className='form-item'>
                        <label htmlFor="username">User Name</label>
                        <input type="text" name="username" id="username" placeholder='User Name' /> 
                    </div>

                    <div className='form-item'>
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" placeholder='Email' />
                    </div>

                    <div className='form-item'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder='Password' />
                    </div>

                    <div className='form-item'>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password' />
                    </div>

                    <div className='form-item'>
                        <label htmlFor="image">Select Image</label>
                        <input type="file" name="image" id="image" placeholder='Select Image' />
                    </div>

                    <div className='form-item'>
                        <input type="button" value="Register" className='button' />
                    </div>

                    <Link to="/login" >Login Your Account</Link>
                </form>

            </div>
        </div>
        
    </div>
  )
}

export default Register