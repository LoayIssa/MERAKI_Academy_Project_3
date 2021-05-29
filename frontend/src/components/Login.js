import axios from 'axios';
import React , {useState} from 'react';
import {  useHistory } from "react-router-dom";



const Login =(props)=>{
  const history = useHistory();
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [loginError, setLoginError] = useState("");


  const cheakLogin =()=>{
    axios.post(`http://localhost:5000/login` ,{email:email, password:password})
    .then((result)=>{
      if(!result.data.errors){
        props.TokenFun(result.data.token)
        history.push("/dashboard");
        console.log(result)
      }
    }).catch((error)=>{
      setLoginError(error.response.data);
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
    <div className="errorlogin">{loginError ? <p className="errCreated">{loginError}</p> : ""}</div>

    </>
  );

}

export default Login
