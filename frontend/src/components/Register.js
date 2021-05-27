import axios from 'axios';
import React , {useState} from 'react';




/* register */
const Register = ()=>{

  const [firstName,setfirstName]=useState("");
  const [lastName,setlastName]=useState("");
  const [age,setage]=useState("");
  const [country,setcountry]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [stata, setStata] = useState(false); 
  const [stata1, setStata1] = useState(false);
    
  const cheakRegiste  =()=>{
  const newUser={ firstName:firstName, lastName:lastName, age:age, country:country, email:email, password:password};
  
    axios.post(`http://localhost:5000/users` , newUser)
     .then((result)=>{

      if(!result.data.errors){
        console.log("result",result)


        setStata(true)
        setStata1(false)
      }else{
        setStata1(true)
        setStata(false)
        
      }
  
    }).catch((err)=>{
      console.log("Error")
    })
  }
  

    return (
      <>
      <div className ="input">
        <input type ="text" placeholder ="firstName here" onChange={(e)=>{
          setfirstName(e.target.value)
        }}/>
        <input type ="text" placeholder ="lastName here " onChange={(e)=>{
          setlastName(e.target.value)
        }}/>
        <input type ="number" placeholder ="age here" onChange={(e)=>{
          setage(e.target.value)
        }}/>
        <input type ="text" placeholder ="country here " onChange={(e)=>{
          setcountry(e.target.value)
        }}/>
        <input type ="text" placeholder ="email here" onChange={(e)=>{
          setemail(e.target.value)
        }}/>
        <input type ="password" placeholder ="password here" onChange={(e)=>{
          setpassword(e.target.value)
        }}/>
        <button onClick={cheakRegiste}>Register</button>
        {stata?<div className="trueRegiste">The user has been created successfully</div> :""}
        {stata1?<div className="falseRegiste">Error happened while register, please try again</div> :""}
      </div>
      </>
    );
  }
  export default Register