const express = require("express");
const { uuid } = require("uuidv4");
const { User , Articale , Comment,Role} = require("./schema");
const db = require ("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();



const app = express();
const port = 5000;
app.use(express.json());


const SECRET = process.env.SECRET;

/*_________________________________ */
/*________________________________ */
const createNewRole = (req , res)=>{
  const {role,permissions}=req.body
  const newRole = new Role ({role,permissions})
  newRole.save().then((result)=>{
    res.status(200);
    res.json(result)
  }).catch((err)=>{
    res.send(err)
  })
}

app.post("/roles", createNewRole);

const createNewAuthor = (req, res) => {
  
  const  {firstName,lastName,age,country,email,password,roles}= req.body
  const newUser = new  User( {firstName,lastName,age,country,email,password,roles})

  newUser.save().then((result)=>{
    // ما بدخل هون 

    res.status(201)
    res.json(result)
    
  }).catch((err) => {
    res.send(err);
  });
};
app.post("/users", createNewAuthor);

/*_________________________________ */




const createNewArticle  = async (req ,res)=>{
  let userId; 
  
   await User.findOne({firstName:"firas"})
   .then((result)=>{

     userId = result
     console.log("userId",userId)

   }).catch((err) => {
     res.send(err);
   });
  
   const {title,description} = req.body
     const newArticle = new Articale({ 
       title,
       description,
       author:userId._id})
  
       newArticle.save()
       .then((result)=>{       


         res.status(201)
         res.json(result)

       }).catch((err) => {
         res.send(err);
       });

}
app.post("/articles",  createNewArticle)

 /*_________________________________ */
 const getAllArticles = (req,res)=>{
  Articale.find({})
  .then(result=>{
    res.status(200)
    res.json(result)
  }).catch((err)=>{
    res.send(err);
  });
 }
app.get("/articles",getAllArticles);
/*__________________________________ */

const getAllusers = (req,res)=>{
  User.find({})
  .then(result=>{
    res.status(200)
    res.json(result)
  }).catch((err)=>{
    res.send(err);
  });
 }
app.get("/users",getAllusers);
  

/*_________________________________ */

const getArticlesByAuthor = (req, res) => {
 //articles/search_1?author=userId
  const userId =req.query.author;
  Articale.find({author:userId}).then((result)=>{
    res.status(200);
    res.json(result);
  }).catch((err)=>{
    res.status(404);
    res.send(err);
  })
};

app.get("/articles/search_1", getArticlesByAuthor);
/*_________________________________ */




const getAnArticleById = (req, res) => {
  //articles/search_2?author=_id
  const id = req.query.id;
  Articale.find({_id:id}).populate("author","firstName").exec().then((result)=>{
    console.log(result);
    res.status(200)
    res.json(result)
  }).catch((err)=>{
    res.send(err)
  })
 };
 
 app.get("/articles/search_2", getAnArticleById);



/*_________________________________ */
const updateAnArticleById = (req, res) => {
  const id = req.params.id;
  const {title,description,author} = req.body
  if (req.body.title && req.body.description && req.body.author){
    Articale.findByIdAndUpdate(id,{title,description,author}, {new:true})
  .then((result)=>{
    res.status(200)
    res.json(result)
  }).catch((err) => {
    res.send(err);
  });
 }else{
  res.status(404);
  res.json("must enter all keys title and  description ");
 }
};
app.put("/articles/:id", updateAnArticleById);
/*_________________________________ */

const deleteAnArticleById = (req, res) => {
  const id = req.params.id;
  Articale.findByIdAndDelete(id).then((result)=>{
    res.status(200)
    res.json({
      success: true,
      massage: `Success Delete article with id => ${id}`,
    })
  }).catch((err) => {
    res.send(err);
  });
};
app.delete("/articles/:id", deleteAnArticleById);

/*_________________________________ */
const deleteArticlesByAuthor = (req, res) => {
  const author = req.body.author;
  Articale.deleteMany({author:author}).then(result=>{
    res.status(200)
    res.json({
      success: true,
      massage: `Success delete all the articles for the author => ${author}`,
    })
  }).catch((err) => {
    res.send(err);
  });
};
app.delete("/articles", deleteArticlesByAuthor);

/*_________________________________ */
const login  = (req, res, next) =>{
  let {email,password} = req.body;
  email= email.toLowerCase();
  User.findOne({email:email}).populate("roles").then((response)=>{
   if(response){
     const hashedPassword = response.password;
     bcrypt.compare(password,hashedPassword).then((result)=>{
      if (result){
        const payload = {
          userId:`${response._id}`,
          country:response.country,
          role:{role:response.roles.role,permissions:response.roles.permissions}
        }
        
        const options ={expiresIn:"60m"}
        const token = jwt.sign(payload, SECRET, options);

        res.status(200);
        res.json(token);
        }else{
          res.json(" The password you’ve entered is incorrect")
          err.status = 403;
          
      };
     })
     


   }else{
     res.status(404)
     res.json( {message: "The email doesn't exist", status: 404})

   }
  }).catch((err)=>{
    res.send(err);
  })
}

app.post("/login", login );

/*________________________________ */
//// middleware functions  

const authentication =(req,res,next)=>{
  console.log("token",req.headers.authentication)

  const token =  req.headers.authorization.split(" ")[1];
  console.log("token11")
 try {
  const verify = jwt.verify(token,SECRET)
  console.log("verify",verify)
  if (verify){
    next()

  }
    
 }
catch (err){
  res.status(403)
  return res.json({
    massage:"invalid",
    status: 403
  })
}    
    

  
}
/*_________________________________ */
const createNewComment =(req,res)=>{
  // get the id from the params ( بحصل على ايد حتى اضيف على ارتيكل الصحيحه )

  id =req.params.id;
  console.log("loay")
 const {comment,commenter}=req.body;
 const newComment =new Comment({comment,commenter});
 newComment.save().then(async(result)=>{
  
  // acsses artical schema and find by the id then update the schma with commet id 

 await Articale.findOneAndUpdate({_id :id},  {$push:{ comments:result._id}})
 console.log(result);

  res.status(200);
  res.json(result);
}).catch((err)=>{
  res.status(404);
  res.send(err)
})

}
app.post("/articles/:id/comments", authentication, createNewComment)


/*___________________________________ */

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});












