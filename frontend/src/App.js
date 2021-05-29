import React , {useState} from 'react';
import { Route  } from 'react-router-dom';
import Register from './components/Register'
import Navigation from './components/Navigation'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import NewArticle from './components/NewArticle';


import './App.css';

export default function App() {
  const [token, setToken] = useState('');
  
  return (
    <>
    <div className= "App">
      <Navigation token ={token} />
      
        <Route exact path="/register" component = {Register}/>
        <Route exact path="/login" render={()=><Login TokenFun={setToken}/> } />
        <Route exact path="/dashboard"  component ={Dashboard} />
        <Route exact path="/newArticle" render ={()=><NewArticle token={token}/>}/>
        
    </div>
    </>
    
     
  );
}






