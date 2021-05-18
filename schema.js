const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName: { type: String ,required:true},
    lastName: { type: String , required:true },
    age: { type: Number },
    country: { type: String },
    email: { type: String , required:true },
    password:{type:String , required:true},
  });

  
  const articleSchema  = new mongoose.Schema({
    title:{type:String, required:true, unique:true},
    description : {type:String, required:true},
    author:{type:mongoose.Schema.ObjectId,ref:"User"}
})

const commentsSchema  = new mongoose.Schema({
  comment:{type:String},
  commenter:{type:mongoose.Schema.ObjectId,ref:"User"}
})


const User = mongoose.model("User",userSchema);
const Articale = mongoose.model("Articale",articleSchema);
const Comment = mongoose.model("Comment",commentsSchema);
module.exports.User=User;
module.exports.Articale=Articale;
module.exports.Comment=Comment;