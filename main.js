const express = require("express");
const { uuid } = require("uuidv4");
const { User , Articale , Comment} = require("./schema");
const db = require ("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();



const app = express();
const port = 5000;
app.use(express.json());




/*_________________________________ */

const createNewAuthor = (req, res) => {
  
  const  {firstName,lastName,age,country,email,password}= req.body
  const newUser = new  User( {firstName,lastName,age,country,email,password})

  newUser.save().then((result)=>{
    console.log("loay")

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
  
   await User.findOne({firstName:"loay"})
   .then((result)=>{

     userId = result

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

const login  = (req, res) => {
  console.log("hi")
  const {email,password} = req.body;
  User.find({email:email,password:password}).then((result)=>{
    if (result){
    res.status(200);
    res.json("Valid login credentials");
    }else{
    res.status(401);
    res.json("Invalid login credentials")};
  })
    
}
app.post("/login", login );
/*_________________________________ */
const createNewComment =(req,res)=>{
  // get the id from the params ( بحصل على ايد حتى اضيف على ارتيكل الصحيحه )
  id =req.params.id;
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
app.post("/articles/:id/comments", createNewComment)


/*___________________________________ */

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});












