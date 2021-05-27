import React , {useState} from 'react';
import axios from 'axios'
import { Switch, Route ,Link } from 'react-router-dom';
import Register from './components/Register'
import Navigation from './components/Navigation'
import Login from './components/Login'

import './App.css';

export default function App() {
  
  return (
    <>
    <div className= "App">
      <Navigation/>
      
        <Route exact path="/register" component = {Register}/>
        <Route exact path="/login" component = {Login}/>
        
    </div>
    </>
    
     
  );
}






