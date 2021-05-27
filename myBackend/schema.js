const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { response } = require("express");

const userSchema = new mongoose.Schema({
    firstName: { type: String ,required:true},
    lastName: { type: String , required:true },
    age: { type: Number },
    country: { type: String },
    email: { type: String , required:true,unique:true },
    password:{type:String , required:true,unique:true},
    roles:{type:mongoose.Schema.ObjectId,ref:"Role" }
  });


  const articleSchema  = new mongoose.Schema({
    title:{type:String, required:true, unique:true},
    description : {type:String, required:true},
    author:{type:mongoose.Schema.ObjectId,ref:"User"},
    comments:[{type:mongoose.Schema.ObjectId,ref:"Comment"}]
})

const commentsSchema  = new mongoose.Schema({
  comment:{type:String},
  commenter:{type:mongoose.Schema.ObjectId,ref:"User"}
})

const rolesSchema = new mongoose.Schema({
  role:{type:String},
  permissions:[{type:String}]
}) 
 const salt =10;
 userSchema.pre("save",async function(){
  this.email = this.email.toLowerCase();
 console.log("loay",this.email)
 const hashedPassword  = await bcrypt.hash(this.password , salt);
 this.password = hashedPassword;
 console.log("loay123",this.email)

}) 
//قبل ما تعمل تخزين على user schma // 
const User = mongoose.model("User",userSchema);
const Articale = mongoose.model("Articale",articleSchema);
const Comment = mongoose.model("Comment",commentsSchema);
const Role = mongoose.model("Role",rolesSchema);
module.exports.User=User;
module.exports.Articale=Articale;
module.exports.Comment=Comment;
module.exports.Role=Role;