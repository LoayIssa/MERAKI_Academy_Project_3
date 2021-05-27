import React , {useState} from 'react';
import { Switch, Route , Link } from 'react-router-dom';




/* Navigation */
const Navigation = ()=>{
    return(
      <>
      <div className = "navbar">
      <Link  className ="register" to = "/register">Register</Link>
      <Link to = "/login">Login</Link>
      </div>
      </>
    );
  }
  export default Navigation