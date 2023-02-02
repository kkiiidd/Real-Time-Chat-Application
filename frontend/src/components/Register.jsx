import React, { useState } from 'react'
import {Link} from 'react-router-dom';
const Register = () => {
    const [state,setState]=useState({
        userName:'',
        email:'',
        password:'',
        confirmPassword:'',
        image:'',
        imageEvent:''
    })
// 读取输入 @kofeine 2023/02/02 22:38
const inputHandler = (e)=>{

     setState({ 
        ...state,
        [e.target.name]:e.target.value
    })
}
// 读取图片  @kofeine 2023/02/02 22:38
const fileHandler = (e)=>{
    if(e.target.files.length !==0){
        setState({ 
            ...state,
            [e.target.name]:e.target.files[0],
        })

    }
}

const submitHandler = (e) => {
    e.preventDefault();
    console.log(state);
}
  return (
    <div className='account register'>
        <div className='card'>
            <div className="card-head">
                <h1>Register</h1>
            </div>
            <div className="card-body">
                <form className='form' onSubmit={submitHandler}>
                    <div className='form-item'>
                        <label htmlFor="userName">User Name</label>
                        <input type="text" name="userName" value={state.userName} onChange={inputHandler} id="userName" placeholder='User Name' /> 
                    </div>

                    <div className='form-item'>
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" value={state.email} onChange={inputHandler} id="email" placeholder='Email' />
                    </div>

                    <div className='form-item'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={state.password} onChange={inputHandler} id="password" placeholder='Password' />
                    </div>

                    <div className='form-item'>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name="confirmPassword" value={state.confirmPassword} onChange={inputHandler} id="confirmPassword" placeholder='Confirm Password' />
                    </div>

                    <div className='form-item'>
                        <label htmlFor="image">Select Image</label>
                        {/* 没有value @kofeine 2023/02/02 22:54*/}
                        
            
                        <input type="file" name="image" onChange={fileHandler} id="image" placeholder='Select Image' />
                    </div>

                    <div className='form-item'>
                        <input type="submit" value="Register" className='button' />
                    </div>

                    <Link to="/login" >Login Your Account</Link>
                </form>

            </div>
        </div>
        
    </div>
  )
}

export default Register