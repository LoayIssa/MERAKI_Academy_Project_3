import React , {useState} from 'react';
import { Switch, Route , Link } from 'react-router-dom';




/* Navigation */
const Navigation = ()=>{
    return(
      <>
      <div className = "navbar">
      <Link  className ="register" to = "/register">Register</Link>
      <Link to = "/login">Login</Link>
      <Link className ="dashboard" to = "/dashboard">Dashboard</Link>
      <Link  to = "/newArticle">New article</Link>
      </div>
      </>
    );
  }
  export default Navigation