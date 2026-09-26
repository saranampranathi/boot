import React from 'react'
import './LoginSignup.css'
import { useState } from 'react'
//import { set } from 'mongoose';
import { toast } from 'react-toastify';

const LoginSignup = () => {

  const[state,setstate]=useState("Login");
  const[formdata,setformdata]=useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler=(e)=>{
    setformdata({
      ...formdata,[e.target.name]:e.target.value
    })

  }



  const login=async()=>{
    console.log(formdata);
    
    let responsedata;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formdata),
    }).then((response)=>response.json()).then((data)=>responsedata=data)



    if(responsedata.success){
      localStorage.setItem('auth-token',responsedata.token);
      window.location.replace("/");
      toast.success("Logged in",responsedata.name);
    }else{
      toast.error('Invalid Signup');
    }
  }

  const signup=async()=>{
    console.log(formdata);

    let responsedata;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formdata),
    }).then((response)=>response.json()).then((data)=>responsedata=data)
    console.log(responsedata)
    



    if(responsedata.success){
      localStorage.setItem('auth-token',responsedata.token);
      window.location.replace("/");
      toast.success("Logged in",responsedata.name);
    }else{
      toast.error('Invalid Signup');
    }
  }



  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>

        <div className="loginsignup-fields">
          {state==="Sign Up"?<input name='username' value={formdata.username} onChange={changeHandler}  type="text" placeholder="Name" />:<></>}
          <input name='email' value={formdata.email} onChange={changeHandler}  type="email" placeholder="Email ID" />
          <input name='password' value={formdata.password} onChange={changeHandler}  type="password" placeholder="Password" />
        </div>

        <button onClick={()=>{
          {state==="Login"?login():signup()}
        }}>Continue</button>
        {state==="Sign Up"?<p className="loginsignup-login">
          Already have an account? <span onClick={()=>{setstate("Login")}}>Login here</span>
        </p>:<p className="loginsignup-login">
          Create an account <span onClick={()=>{setstate("Sign Up")}}>Click here</span>
        </p>}

        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>By continuing, you agree to the Terms & Conditions</p>
        </div>

      </div>
    </div>
  )
}

export default LoginSignup
