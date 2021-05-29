import React, { useState } from 'react';
import axios from 'axios';


const  NewArticle =(props)=>{
const[title,setTitle]=useState("")
const [description, setDescription] = useState("");
const [stata, setStata] = useState(false); 
const [stata1, setStata1] = useState(false);

const Chickarticle =()=>{
    axios.post("http://localhost:5000/articles",{title,description },
    {headers:{authorization: "Bearer " + props.token}})
    .then((result)=>{
    if(!result.data.errors){
       setStata(true)
       setStata1(false)
    }else{
       setStata1("Error happened while creating new article, please try again")
       setStata(false)
    }  
    }).catch((error)=>{
        setStata1("you need to login first") 
    })
}
return (
    <>
    <div className ="input">
      
      <input type ="text" placeholder ="title here" onChange={(e)=>{
        setTitle(e.target.value)
      }}/>
      <textarea className="textarea" placeholder="description here" onChange={(e)=>{
        setDescription(e.target.value)
      }}></textarea> 
      <button onClick={Chickarticle} >Create New Article</button>
    </div>
    <div>
        {stata?(<p className="createMassage">The article has been created successfully</p>):("")}
    </div>
    <div>
        {stata1?(<p className="createerrMassage">{stata1}</p>):("")}
    </div>

    </>
  );

}
export default NewArticle