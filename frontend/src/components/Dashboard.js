import axios from 'axios';
import React , {useState,useEffect} from 'react';

const Dashboard = ()=>{
 const [articles,setarticles]=useState([])
 useEffect(()=>{
   axios.get("http://localhost:5000/articles")
   .then((result)=>{
    setarticles(result.data)   
   })  
 },[])


    return (
        <>
        <p>Dashboard</p>
        <div className="parantarticles">
            {articles.map((elem,i)=>{
               return (<div className="returnarticles">
               <h2>{elem.title}</h2>
               <p>{elem.description}</p>

               </div>) 
            })}
        </div>
        </>
    )
}
export default Dashboard