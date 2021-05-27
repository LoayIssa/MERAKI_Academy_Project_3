import axios from 'axios';
import React , {useState} from 'react';

const Login =()=>{

  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");

  return (
    <>
    <div className ="input">
      
      <input type ="text" placeholder ="email here" onChange={(e)=>{
        setemail(e.target.value)
      }}/>
      <input type ="password" placeholder ="password here" onChange={(e)=>{
        setpassword(e.target.value)
      }}/>
      <button>Login</button>
    </div>
    </>
  );

}

export default Login
