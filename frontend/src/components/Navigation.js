import React , {useState} from 'react';
import {  Link } from 'react-router-dom';




/* Navigation */
const Navigation = (props)=>{
    return(
      <>
      <div className = "navbar">
      
      {!props.token ?<div className="Navigation">
      <Link  className ="register" to = "/register">Register</Link>
      <Link to = "/login">Login</Link>
      </div>:""}

      {props.token ?<div className="Navigation">
      <Link className ="dashboard" to = "/dashboard">Dashboard</Link>
      <Link  to = "/newArticle">New article</Link>
      </div>:""}
        
      
      </div>
      </>
    );
  }
  export default Navigation