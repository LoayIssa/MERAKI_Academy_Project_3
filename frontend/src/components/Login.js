import axios from 'axios';
import React , {useState} from 'react';
import {  useHistory } from "react-router-dom";


const Login =(props)=>{
  const history = useHistory();
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");

  const cheakLogin =()=>{
    axios.post(`http://localhost:5000/login` ,{email:email, password:password})
    .then((result)=>{
      if(!result.data.errors){
        props.TokenFun(result.data.token)
        history.push("/dashboard");
        console.log(result)
      }else{

      }
      
    })

  }

  return (
    <>
    <div className ="input">
      
      <input type ="text" placeholder ="email here" onChange={(e)=>{
        setemail(e.target.value)
      }}/>
      <input type ="password" placeholder ="password here" onChange={(e)=>{
        setpassword(e.target.value)
      }}/>
      <button onClick={cheakLogin}>Login</button>
    </div>
    </>
  );

}

export default Login
